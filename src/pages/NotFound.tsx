import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: לא נמצא נתיב", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="py-20 text-center">
        <h1 className="text-5xl font-black">404</h1>
        <p className="mt-3 text-muted-foreground">העמוד המבוקש אינו קיים.</p>
        <Link to="/" className="mt-6 inline-block text-primary hover:underline">
          חזרה לתחזית ←
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
