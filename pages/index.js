import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";
import { Fragment } from "react";


function HomePage(props) {
  return (
    <Fragment>
      <EventList items={props.events} />
    </Fragment>
  );
}

export default HomePage;


export async function getStaticProps(){
  const featuredEvents = await(getFeaturedEvents())
  return{
    props:{
      events:featuredEvents
    },
    revalidate:600
  }
}