import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import axios from "axios";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filteredData = router.query.slug;
  const fetcher = (url) => axios.get(url).then(res=>res.data)
  const { data, error } = useSWR(
    "https://next-jscourse-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",fetcher
  );
  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <h2 className="center2">Loading..</h2>;
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 || error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <h2 className="center">Invalid filter, please adjust your values!</h2>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <h2 className="center">No event found!</h2>
        </ErrorAlert>
      </Fragment>
    );
  }
  

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventPage;
