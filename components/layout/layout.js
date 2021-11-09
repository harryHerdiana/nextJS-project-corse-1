import { Fragment, useContext } from "react";
import Copyright from "../copyright/Copyright";
import MainHeader from "./main-header";
import NotificationContext from "../../store/notification-content";
import Notification from "../ui/notification";

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <Fragment>
      <header>
        <MainHeader />
      </header>
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      <Copyright />
    </Fragment>
  );
}

export default Layout;
