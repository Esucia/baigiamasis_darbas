import {router, useForm} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


export default function Create(props){
    const {data, setData, post, errors} = useForm({
        name:"",
        summary:"",
        isbn:"",
        picture:"",
        page:"",
        category_id:""
    });
    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    };
    const handleSubmit=(event)=>{
        event.preventDefault();
        post(route("foods.store"));
    };
    /*const handleSubmit=(event)=>{
        event.preventDefault();
        router.post( route("foods.store"),{
            ...data,
            _method:'post',
        });
    }*/
    const catSele=[];
    catSele.push(<option key="0" value="">-</option> );
    props.categories.forEach((category)=>{
        catSele.push(<option key={category.id} value={category.id}>{category.name}</option> )
    });
    return(
        <AppLayout>
            <div className="card">
                <div className="card-header">Prideti krypti</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Pavadinimas</label>
                            <input className={"form-control "+(errors.name!=null?"is-invalid":"")} type="text" id="name" onChange={handleChange}/>
                            <div className="invalid-feedback">{errors.name}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Santrauka</label>
                            <input className={"form-control "+(errors.summary!=null?"is-invalid":"")} type="text" id="summary" onChange={handleChange}/>
                            <div className="invalid-feedback">{errors.summary}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">ISBN</label>
                            <input className={"form-control "+(errors.isbn!=null?"is-invalid":"")} type="text" id="isbn" onChange={handleChange}/>
                            <div className="invalid-feedback">{errors.isbn}</div>
                        </div>
                        <div className="mb-3">
                            <input className="form-control" type="file" id="picture" onChange={(event)=>{
                                setData({
                                    ...data,
                                    picture: event.target.files[0]
                                })}
                            } />
                        </div>
                        {/*<div className="mb-3">*/}
                        {/*    <label className="form-label">Puslapių skaičius</label>*/}
                        {/*    <input className={"form-control "+(errors.page!=null?"is-invalid":"")} type="text" id="page" onChange={handleChange}/>*/}
                        {/*    <div className="invalid-feedback">{errors.page}</div>*/}
                        {/*</div>*/}
                        <div className="mb-3">
                            <label>Kategorija</label>
                            <select className={"form-control "+(errors.category_id!=null?" is-invalid":"")}  id="category_id" onChange={handleChange} value={data.category_id}>
                                {catSele}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success">Pridėti</button>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
