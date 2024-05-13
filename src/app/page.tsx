import Link from 'next/link';
import Title from './components/Title';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import { Order, OrderLineItem } from 'square';

export default function HomePage() {
    return (
        <div>
            <Title title={"Home-made Bundt Cakes"} />

            <div className="grid grid-cols-10">

                <div className="col-start-3 col-end-9">
                    <p className="p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <Link href='/products' className="btn">View Menu</Link>

                </div>
            </div>
        </div>
    )
}