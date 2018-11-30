name := """westminster-library-application"""
organization := "com.westminster.w1673601"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.12.6"

libraryDependencies += guice
libraryDependencies ++= Seq(
  javaJdbc,
  ehcache,
  javaWs,
  evolutions
)