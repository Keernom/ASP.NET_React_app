import React, { Component } from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import style from './Home.module.css';
import Button from 'react-bootstrap/Button';

const Home = () => {

  return (
    <>
      <div className={style.titleDiv}>
        <h1>ASP.NET Core + React FullStack Application</h1>
      </div>

      <div className={style.cardsDiv}>
        <Card className={style.reactCard}>
          <img src={require('../../imgs/react_logo.png')} />
          <Card.Body>
            <Card.Title>ReactJS</Card.Title>
            <Card.Text>
              The library for web and native user interfaces
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className={style.aspnetCard}>
          <img src={require('../../imgs/aspnet_core_logo.png')} className={style.cardImage} />
          <Card.Body>
            <Card.Title>Asp.Net Core</Card.Title>
            <Card.Text>
              A framework for building web apps and services with .NET and C#
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className={style.postgresCard}>
          <img src={require('../../imgs/postgresql_logo.png')} />
          <Card.Body>
            <Card.Title>Postgresql</Card.Title>
            <Card.Text>
              Open source object-relational database
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className={style.efcoreCard}>
          <img src={require('../../imgs/efcore_logo.png')} className={style.cardImage} />
          <Card.Body>
            <Card.Title>Entity Framework Core</Card.Title>
            <Card.Text>
              Powerful Object-Relational Mapping (ORM) tool developed by Microsoft for interacting with the database within .NET applications
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className={style.jwtCard}>
          <img src={require('../../imgs/jwt_logo.png')} className={style.cardImage} />
          <Card.Body>
            <Card.Title>JWT Token Authotization</Card.Title>
            <Card.Text>
              JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Home
