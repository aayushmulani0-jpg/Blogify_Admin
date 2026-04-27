import React from "react";
import { Result, Button } from "antd";
import { t } from "i18next";
import { useNavigate } from "react-router";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle={t("page.notFound", {
        defaultValue: "Sorry, the page you visited does not exist.",
      })}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          {t("notFound.home", {
            defaultValue: "Go Home",
          })}
        </Button>
      }
    />
  );
};
export default NotFound;
