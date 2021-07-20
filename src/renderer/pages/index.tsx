import dynamic from "next/dynamic";

const App = dynamic(async () => (await import("~/components/App")).App, { ssr: false });

const IndexPage = () => {
  return <App />;
};

export default IndexPage;
