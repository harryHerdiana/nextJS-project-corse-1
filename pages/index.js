import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";
import { Fragment } from "react";
import Head from 'next/head'
import NewsletterRegistration from '../components/input/newsletter-registration';



function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Next JS Events</title>
        <meta name="description" content="Find a lot of great events that allow you to improve yourself."/>
      </Head>
      <NewsletterRegistration />
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