import { Fragment } from "react";
import { getEventById,getFeaturedEvents } from "../../helpers/api-utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistic from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";


function EventDetailPage(props) {
  const event = props.selectedEvent

  if (!event) {
    return <h1 className="center2">
        Loading...
    </h1>;
  }
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistic
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;


export async function getStaticProps(context){
  const eventId = context.params.eventId;
  const event = await getEventById(eventId)
  return {
    props:{
      selectedEvent : event
    },
    revalidate:30
  }
}

export async function getStaticPaths(){
  const events = await getFeaturedEvents()
  const dynamicPath = events.map(event=>({params:{eventId:event.id}}))
  return{
    paths:dynamicPath,
    fallback:true
  }
}