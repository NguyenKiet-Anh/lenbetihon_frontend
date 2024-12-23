import React, { Fragment } from 'react';
import Hero from '../components/Layout/Content/Hero';
import Popular from '../components/Layout/Content/Popular';
import Offers from '../components/Layout/Content/Offers';
import NewCollections from '../components/Layout/Content/NewCollections';
import NewsLetter from '../components/Layout/Content/NewsLetter';

function Home() {
    return (
        <Fragment>
            <Popular />
            <NewCollections />
            <NewsLetter />
        </Fragment>
    );
}

export default Home;
