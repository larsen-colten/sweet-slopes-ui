import React from 'react'

interface Weather {
    date: Date,
    temperatureC: number,
    temperatureF: number,
    summary: string
}


export default async function homePage() {
    const response = await fetch('https://sweet-slopes-api-05938f919785.herokuapp.com/WeatherForecast',
        { next: { revalidate: 10 } } // refresh cache every 10 seconds or use (cache: 'no-store')
    );
    const weathers: Weather[] = await response.json();

    return (
        <div>
            <>Home Page</>
            {weathers.map(item =>
                <div key={item.summary}>
                    temperatureC = {item.temperatureC}
                    temperatureF = {item.temperatureF}
                    summary = {item.summary}
                </div>
            )}
        </div>
    )
}