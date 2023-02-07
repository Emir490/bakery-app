export interface Item {
    _id: string;
    name: string;
    price: number;
    units?: number;
    type: 'dulce' | 'blanco',
    area: 'panaderia' | 'pasteleria'
}