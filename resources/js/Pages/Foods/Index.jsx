import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";

export default function Index(props){
    const edit=props.can.edit;
    const [filter, setFilter]=useState({
        name:props.filter.name
    });
    const handleFilter=()=>{
        router.post(route("foods.filter"),filter);
    }
    const handleChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        });
    }

    const foodList = [];
    props.foods.forEach((food)=>{
        foodList.push(<tr key={food.id}>
            <td>{food.name}</td>
            <td>{food.summary}</td>
            <td>{food.isbn}</td>
            <td>{food.picture && <img alt="foto" width="80px" src={"/storage/foods/"+food.picture} />}</td>
            <td>{food.page}</td>
            <td>{food.category.name}</td>
            <td>
                {edit && <Link className="btn btn-primary" href={ route('foods.edit', food.id)}>Redaguoti</Link>}
                {edit && <button className="btn btn-warning" onClick={()=>{router.delete(route("foods.destroy", food.id))}}>Trinti</button>}
            </td>
        </tr> )
    });
    return(
        <AppLayout>
            <div className="card">
                <div className="card-header">
                    Maisto sąrašas
                    {edit && <Link className="btn btn-info float-end" href={route("foods.create")}>Pridėti patiekalą</Link>}

                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>
                                <label>Pagal patiekalo pavadinimą</label>
                                <input onChange={handleChange} id="name" value={filter.name} type="text" className="form-control"/>
                            </th>
                            <th>
                                <button onClick={handleFilter} className="btn btn-warning">Ieskoti</button>
                            </th>
                        </tr>
                        <tr>
                            <th>Pavadinimas</th>
                            <th>Santrauka</th>
                            <th>ISBN</th>
                            <th>Nuotrauka</th>
                            <th>Puslapių kiekis</th>
                            <th>Kategorija</th>
                            {edit &&<th>Veiksmai</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {foodList}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    )
}
