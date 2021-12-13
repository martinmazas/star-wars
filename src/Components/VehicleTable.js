import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BasicTable from './BasicTable';

export default function VehicleTable(props) {
    const [planets, setPlanets] = useState([]);
    const [people, setPeople] = useState([]);

    const getPlanetNames = () => {
        props.maxSum['planets'].map(
            planet => axios.get(planet)
                .then(doc => setPlanets(planets => [...planets, [doc.data.name, doc.data.population]]))
                .catch(err => console.log(err))
        )

        props.maxSum['people'].map(
            p => setPeople(people => [...people, p])
        )
    }

    useEffect(() => {
        getPlanetNames();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <BasicTable props={props} planets={planets} people={people} />
        </div>
    )
}