import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { DEMO_LOGIN, lecturers, seedRegistrations, seedTopics } from "./mock-data";
import { canRegister, type RuleResult } from "./topic-rules";
import type { Registration, RegistrationInput, RegistrationStatus, Topic, TopicInput } from "./types";

/**
 * Demo-only store: sample data lives in the browser (localStorage) so the
 * prototype feels real. There is no server or database behind it.
 */
const STORAGE_KEY = "capstoneflow-demo-v1";

interface State {
  topics: Topic[];
  registrations: Registration[];
  lecturerId: number | null;
}

interface Store extends State {
  hydrated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  createTopic: (input: TopicInput) => Topic;
  updateTopic: (id: number, input: TopicInput) => void;
  deleteTopic: (id: number) => void;
  toggleTopicStatus: (id: number) => void;
  submitRegistration: (topicId: number, input: RegistrationInput) => RuleResult;
  setRegistrationStatus: (id: number, status: RegistrationStatus) => void;
  resetDemo: () => void;
}

const initialState: State = { topics: seedTopics, registrations: seedRegistrations, lecturerId: null };

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initialState, ...(JSON.parse(raw) as State) });
    } catch {
      /* ignore broken demo storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const login = useCallback((email: string, password: string) => {
    const lecturer = lecturers.find((l) => l.email.toLowerCase() === email.trim().toLowerCase());
    const ok = !!lecturer && (password === DEMO_LOGIN.password);
    if (ok) setState((s) => ({ ...s, lecturerId: lecturer.id }));
    return ok;
  }, []);

  const logout = useCallback(() => setState((s) => ({ ...s, lecturerId: null })), []);

  const createTopic = useCallback(
    (input: TopicInput) => {
      const now = new Date().toISOString();
      const topic: Topic = {
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

  const updateTopic = useCallback((id: number, input: TopicInput) => {
    setState((s) => ({
      ...s,
      topics: s.topics.map((t) => (t.id === id ? { ...t, ...input, updatedAt: new Date().toISOString() } : t)),
    }));
  }, []);

  const deleteTopic = useCallback((id: number) => {
    setState((s) => ({
      ...s,
      topics: s.topics.filter((t) => t.id !== id),
      registrations: s.registrations.filter((r) => r.topicId !== id),
    }));
  }, []);

  const toggleTopicStatus = useCallback((id: number) => {
    setState((s) => ({
      ...s,
      topics: s.topics.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "OPEN" ? "CLOSED" : "OPEN", updatedAt: new Date().toISOString() }
          : t,
      ),
    }));
  }, []);

  const submitRegistration = useCallback(
    (topicId: number, input: RegistrationInput): RuleResult => {
      const topic = state.topics.find((t) => t.id === topicId);
      const check = canRegister(topic, state.registrations, input.studentEmail);
      if (!check.ok) return check;
      const reg: Registration = {
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

  const setRegistrationStatus = useCallback((id: number, status: RegistrationStatus) => {
    setState((s) => ({
      ...s,
      registrations: s.registrations.map((r) => (r.id === id ? { ...r, status } : r)),
    }));
  }, []);

  const resetDemo = useCallback(() => setState((s) => ({ ...initialState, lecturerId: s.lecturerId })), []);

  const value = useMemo<Store>(
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
    [state, hydrated, login, logout, createTopic, updateTopic, deleteTopic, toggleTopicStatus, submitRegistration, setRegistrationStatus, resetDemo],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function getLecturer(id: number | null | undefined) {
  return lecturers.find((l) => l.id === id);
}
