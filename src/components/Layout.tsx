import Head from "next/head";
import React, { CSSProperties, ReactNode } from "react";

// import 'bootstrap/dist/css/bootstrap.min.css';

interface LayoutProps {
  children: ReactNode;
  style?: CSSProperties;
  maxWidth?: number;
}

export const Flow: React.FC<LayoutProps> = ({ children, style }) => (
  <div style={style}>
    {children}
    <style jsx>{`
      div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 0 auto;
        padding: 0px;
      }
    `}</style>
  </div>
);

export const Wrapped: React.FC<LayoutProps> = ({
  children,
  style,
  maxWidth,
}) => (
  <div style={style}>
    {children}
    <style jsx>{`
      div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
        max-width: ${maxWidth ? maxWidth : 1000}px;
        margin: 0 auto;
        padding: 0px;
      }
    `}</style>
  </div>
);

export const Center: React.FC<LayoutProps> = ({
  children,
  style,
  maxWidth,
}) => (
  <div style={style}>
    {children}
    <style jsx>{`
      div {
        max-width: ${maxWidth ? maxWidth : 1000}px;
        margin: 0 auto;
        padding: 0px;
      }
    `}</style>
  </div>
);

interface PageProps {
  children: ReactNode;
}

export const Page: React.FC<PageProps> = ({ children }) => (
  <div>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:400,700"
        rel="stylesheet"
      />
    </Head>

    <main>{children}</main>

    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
      }
      body {
        background-color: #fafaff;
        font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #222222;
      }
      main {
        padding-top: 20px;
        padding-left: 0px;
        padding-right: 0px;
      }
    `}</style>
  </div>
);
