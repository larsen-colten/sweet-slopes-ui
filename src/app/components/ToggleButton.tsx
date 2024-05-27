import React, { useState, useRef, useEffect } from 'react';
import './ToggleButton.css';
import { getCalandarCount } from '../actions/actions';

// Define the input style outside of the render method
const inputStyle = {
    color: '#333', // text color
    backgroundColor: '#fff', // background color
    border: '1px solid #ae7b7b', // border color and width
    borderRadius: '10px', // border radius for rounded corners
    padding: '10px', // padding inside the select
    fontFamily: 'Arial, sans-serif', // font family
    fontSize: '16px', // font size
};

const ToggleButton = () => {
    const [isDelivery, setIsDelivery] = useState(true);

    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');

    const [maxError, setMaxError] = useState(false);

    const modalRef = useRef<HTMLDialogElement>(null);

    const maxDays = 3;



    useEffect(() => {
        const fetchCalendarCount = async () => {
            const count = await getCalandarCount(date);
            if (count >= maxDays) {
                setMaxError(true);
            } else {
                setMaxError(false);
            }
            console.log(count);
        };

        fetchCalendarCount();
    }, [date]);



    function createDateTimeString(date: Date, time: string): string {
        return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }) + ' ' + time;
    }

    function openModal() {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    }

    function closeModal() {
        if (modalRef.current) {
            modalRef.current.close();
        }
    }

    return (
        <div className="toggle-button rounded-lg">
            <button
                className={`toggle-option ${isDelivery ? 'active' : ''} rounded-l-lg`}
                onClick={() => { setIsDelivery(true); openModal(); }}
            >
                Delivery
                <div className="text-xs">{createDateTimeString(date, time)}</div>
            </button>
            <button
                className={`toggle-option ${!isDelivery ? 'active' : ''} rounded-r-lg`}
                onClick={() => { setIsDelivery(false); openModal(); }}
            >
                Pickup
                <div className="text-xs">{createDateTimeString(date, time)}</div>
            </button>

            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                    </form>
                    <h3 className='mb-3 '>Order details</h3>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h2 className='p-1'>Date</h2>
                        <input
                            type="date"
                            value={date.toISOString().split('T')[0]}
                            onChange={(e) => {
                                const newDate = new Date(e.target.value + 'T00:00');
                                setDate(prevDate => newDate);
                            }}
                            style={{
                                color: '#333', // text color
                                backgroundColor: '#fff', // background color
                                border: '1px solid #ae7b7b', // border color and width
                                borderRadius: '10px', // border radius for rounded corners
                                padding: '7px', // padding inside the select
                                fontFamily: 'Arial, sans-serif', // font family
                                fontSize: '16px', // font size
                            }}
                            className='mb-3 '
                        />

                        {maxError && <div className="error-message text-red-500">The selected day is full. Please choose another day.</div>}

                        <h2 className='p-1'>Delivery Time</h2>
                        <select
                            value={time}
                            onChange={(e) => {
                                const newTime = e.target.value;
                                setTime(prevTime => newTime);
                            }}
                            style={{
                                color: '#333', // text color
                                backgroundColor: '#fff', // background color
                                border: '1px solid #ae7b7b', // border color and width
                                borderRadius: '10px', // border radius for rounded corners
                                padding: '10px', // padding inside the select
                                fontFamily: 'Arial, sans-serif', // font family
                                fontSize: '16px', // font size
                            }}
                            className='mb-3 '
                        >
                            {isDelivery ? (
                                Array.from({ length: 14 }, (_, i) => {
                                    const hour = Math.floor(i / 2) + 9;
                                    const minute = (i % 2) * 30;
                                    const hour12 = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
                                    const ampm = hour >= 12 ? 'PM' : 'AM';
                                    const timeString = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
                                    return <option key={timeString} value={timeString}>{timeString}</option>;
                                })
                            ) : (
                                Array.from({ length: 7 }, (_, i) => {
                                    const hour = Math.floor(i / 2) + 15; // Start from 3:30PM
                                    const minute = (i % 2) * 30;
                                    const hour12 = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
                                    const ampm = hour >= 12 ? 'PM' : 'AM';
                                    const timeString = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
                                    return <option key={timeString} value={timeString}>{timeString}</option>;
                                })
                            )}
                        </select>

                        {isDelivery && (
                            <>

                                <h2 className='p-1'>Address</h2>
                                <input
                                    type="text"
                                    placeholder="Address 1"
                                    value={address1}
                                    onChange={(e) => setAddress1(e.target.value)}
                                    style={inputStyle}
                                    className='mb-3 '
                                    required
                                />
                                <h2 className='p-1'>Address 2</h2>
                                <input
                                    type="text"
                                    placeholder="Address 2"
                                    value={address2}
                                    onChange={(e) => setAddress2(e.target.value)}
                                    style={inputStyle}
                                    className='mb-3 '
                                    required
                                />
                                <h2 className='p-1'>City</h2>
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    style={inputStyle}
                                    className='mb-3 '
                                    required
                                />
                                <h2 className='p-1'>State</h2>
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    style={inputStyle}
                                    className='mb-3 '
                                    required
                                />
                                <h2 className='p-1'>Zip</h2>
                                <input
                                    type="text"
                                    placeholder="Zip"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                    style={inputStyle}
                                    className='mb-3 '
                                    required
                                />

                                {(!address1 || !city || !state || !zip) && (
                                    <p className="text-red-500">Please fill out all required fields.</p>
                                )}
                            </>


                        )}

                        <button
                            className="btn btn-primary mt-5 "
                            onClick={closeModal}
                            disabled={maxError || isDelivery && (!address1 || !city || !state || !zip)}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ToggleButton;