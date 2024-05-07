
type Datatables = {
    name: string;
    post: string;
    project: string;
    status: string;
    budget: string;
};

type SelectedRowDatatable = {
    name: string;
    post: string;
    project: string;
    status: string;
    budget: string;
    selectable:boolean
};

type filtrable = {
    name: string;
    image: string,
    price: number,
    rating: number,
    stock: boolean,
};

type filtrablePrueba = {
    ID: number;
    Edad: string,
    Fecha: Date,
    Procedimiento: string,
    Completado: boolean,
};


export type { Datatables, SelectedRowDatatable, filtrable, filtrablePrueba };