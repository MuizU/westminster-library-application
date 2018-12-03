name := """westminster-library-application"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava).settings(
  watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

scalaVersion := "2.12.2"

libraryDependencies += guice

libraryDependencies += "com.google.firebase" % "firebase-admin" % "6.5.0"

