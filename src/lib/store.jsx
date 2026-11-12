import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { DEMO_LOGIN, lecturers, seedRegistrations, seedTopics } from "./mock-data";
import { canRegister } from "./topic-rules";

/**
 * Demo-only store: sample data lives in the browser (localStorage) so the
 * prototype feels real. There is no server or database behind it.
 */
const STORAGE_KEY = "capstoneflow-demo-v1";

const initialState = { topics: seedTopics, registrations: seedRegistrations, lecturerId: null };

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initialState, ...JSON.parse(raw) });
    } catch {
      /* ignore broken demo storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const login = useCallback((email, password) => {
    const lecturer = lecturers.find((l) => l.email.toLowerCase() === email.trim().toLowerCase());
    const ok = !!lecturer && password === DEMO_LOGIN.password;
    if (ok) setState((s) => ({ ...s, lecturerId: lecturer.id }));
    return ok;
  }, []);

  const logout = useCallback(() => setState((s) => ({ ...s, lecturerId: null })), []);

  const createTopic = useCallback(
    (input) => {
      const now = new Date().toISOString();
      const topic = {
        ...input,
        id: Math.max(0, ...state.topics.map((t) => t.id)) + 1,
        lecturerId: state.lecturerId ?? 1,
        createdAt: now,
        updatedAt: now,
      };
      setState((s) => ({ ...s, topics: [topic, ...s.topics] }));
      return topic;
    },
    [state.topics, state.lecturerId],
  );

  const updateTopic = useCallback((id, input) => {
    setState((s) => ({
      ...s,
      topics: s.topics.map((t) =>
        t.id === id ? { ...t, ...input, updatedAt: new Date().toISOString() } : t,
      ),
    }));
  }, []);

  const deleteTopic = useCallback((id) => {
    setState((s) => ({
      ...s,
      topics: s.topics.filter((t) => t.id !== id),
      registrations: s.registrations.filter((r) => r.topicId !== id),
    }));
  }, []);

  const toggleTopicStatus = useCallback((id) => {
    setState((s) => ({
      ...s,
      topics: s.topics.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "OPEN" ? "CLOSED" : "OPEN",
              updatedAt: new Date().toISOString(),
            }
          : t,
      ),
    }));
  }, []);

  const submitRegistration = useCallback(
    (topicId, input) => {
      const topic = state.topics.find((t) => t.id === topicId);
      const check = canRegister(topic, state.registrations, input.studentEmail);
      if (!check.ok) return check;
      const reg = {
        ...input,
        id: Math.max(0, ...state.registrations.map((r) => r.id)) + 1,
        topicId,
        status: "NEW",
        createdAt: new Date().toISOString(),
      };
      setState((s) => ({ ...s, registrations: [reg, ...s.registrations] }));
      return { ok: true };
    },
    [state.topics, state.registrations],
  );

  const setRegistrationStatus = useCallback((id, status) => {
    setState((s) => ({
      ...s,
      registrations: s.registrations.map((r) => (r.id === id ? { ...r, status } : r)),
    }));
  }, []);

  const resetDemo = useCallback(
    () => setState((s) => ({ ...initialState, lecturerId: s.lecturerId })),
    [],
  );

  const value = useMemo(
    () => ({
      ...state,
      hydrated,
      login,
      logout,
      createTopic,
      updateTopic,
      deleteTopic,
      toggleTopicStatus,
      submitRegistration,
      setRegistrationStatus,
      resetDemo,
    }),
    [
      state,
      hydrated,
      login,
      logout,
      createTopic,
      updateTopic,
      deleteTopic,
      toggleTopicStatus,
      submitRegistration,
      setRegistrationStatus,
      resetDemo,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function getLecturer(id) {
  return lecturers.find((l) => l.id === id);
}
