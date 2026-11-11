import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/lecturer/")({
  beforeLoad: () => {
    throw redirect({ to: "/lecturer/dashboard" });
  },
});
