import {router, useForm} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


export default function Edit(props){
    const {data, setData, put, errors} = useForm(props.category);
    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    };
    const handleSubmit=(event)=>{
        event.preventDefault();
        put(route("categories.update", data.id));
    }

    return(
        <AppLayout>
            <div className="card">
                <div className="card-header">Redagavimas</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Pavadinimas</label>
                            <input className={"form-control "+(errors.name!=null?"is-invalid":"")} type="text" id="name" value={data.name} onChange={handleChange}/>
                            <div className="invalid-feedback">{errors.name}</div>
                        </div>
                        <button type="submit" className="btn btn-success">Pridėti</button>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
