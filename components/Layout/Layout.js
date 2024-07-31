import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Employee Management App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-background flex justify-center items-center py-8 px-4">
        <div className="wrapper">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;