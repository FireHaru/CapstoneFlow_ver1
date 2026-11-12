export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/lecturer/dashboard",
      permanent: false,
    },
  };
}

export default function LecturerIndex() {
  return null;
}
