import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";

export default function Index(props){
    const edit=props.can.edit;
    const catList=[];
    props.categories.forEach((category)=>{
        catList.push(<tr key={category.id}>
            <td>{category.name}</td>
            <td>
                {edit &&<Link className="btn btn-primary" href={ route('categories.edit', category.id)}>Redaguoti</Link>}
                {edit &&<button className="btn btn-warning" onClick={()=>{router.delete(route("categories.destroy", category.id))}}>Trinti</button>}
            </td>
        </tr> )
    });
    return(
        <AppLayout>
            <div className="card">
                <div className="card-header">
                    Kategorijos
                    {edit &&<Link className="btn btn-info float-end" href={route("categories.create")}>Pridėti kategoriją</Link>}

                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Pavadinimas</th>
                            <th>Veiksmai</th>
                        </tr>
                        </thead>
                        <tbody>
                        {catList}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    )
}
