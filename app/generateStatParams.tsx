export async function generateStaticParams() {
    const resTypes = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
    const vehicleTypes = await resTypes.json();

    const paths = vehicleTypes.Results.flatMap(type => {
        return Array.from({ length: new Date().getFullYear() - 2015 + 1 }, (_, i) => {
            const year = 2015 + i;
            return { makeId: type.MakeId.toString(), year: year.toString() };
        });
    });

    return paths;
}
