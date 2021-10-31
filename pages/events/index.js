import { Fragment } from "react";
import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { useRouter } from "next/router";
import Head from "next/head";

function AllEventPage(props) {
  const events = props.allEvent;
  const router = useRouter();
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <Fragment>
      <Head>
        <title>Next JS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to improve yourself."
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}
export default AllEventPage;

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      allEvent: events,
    },
    revalidate: 60,
  };
}
