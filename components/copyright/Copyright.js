import Link from "next/link";
import { Fragment } from "react";
import classes from "./Copyright.module.css";

export default function Copyright() {
  return (
    <Fragment className={classes.text_container}>
      <h2 className={classes.text}>
        {"Copyright © "}
        <Link color="inherit" href="https://jabarcodingcamp.id/">
          JCC Harry Herdiana
        </Link>{" "}
        &nbsp;
        <Link color="inherit" href="https://academind.com/">
          & Academind
        </Link>{" "}
        &nbsp;
        {new Date().getFullYear()}.
      </h2>
    </Fragment>
  );
}
