import Link from "next/link";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";

interface Weather {
  date: Date,
  temperatureC: number,
  temperatureF: number,
  summary: string
}

export default async function Home() {
  const response = await fetch('https://sweet-slopes-api-05938f919785.herokuapp.com/WeatherForecast',
    { next: { revalidate: 10 } } // refresh cache every 10 seconds or use (cache: 'no-store')
  );
  const weathers: Weather[] = await response.json();

  return (
    <>
      {/* <p>Hello World</p>
      <Link href={"/contact"}>Contact</Link>

      <ProductCard />

      <p>WEATHERS</p>
      <ul>
        {weathers.map(weather => <li>{weather.temperatureF}</li>)}

      </ul>

      <button className="btn">BUTTON</button>


      // */}
      <Header />

    </>
  );
}
