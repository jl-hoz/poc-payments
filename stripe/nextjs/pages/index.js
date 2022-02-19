import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import React, { useState, useEffect } from 'react';

import Card from './Card';

const Home = () => {

  const [publishableKey, setPublishableKey] = useState('');

  useEffect(() => {
    fetch('api/keys', {
      method: 'GET',
      headers: {'ContentType': 'application/json'},
    })
      .then((res) => res.json())
      .then((data) => {
        setPublishableKey(data.publishableKey);
      })
  });

  if(!publishableKey){
    return 'Loading...';
  }

  const stripeKey = loadStripe(publishableKey);

  return (
    <Elements stripe={stripeKey}>
      <Card />
    </Elements>
  )
}

export default Home;
