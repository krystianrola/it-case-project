import { NavLink } from "react-router-dom"

const ReservatieHeader = () =>{
    return(
        <div>
            <ul>
                <li>
                    <NavLink exact to="/reservations">Actieve reserveringen</NavLink>
                </li>
                <li>
                    <NavLink exact to="/Geannuleerde_ReservatieLijst">geannuleerde reserveringen</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default ReservatieHeader