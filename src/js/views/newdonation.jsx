import { useForm } from "react-hook-form";

export const NewDonation = () => {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // handleData(data);
        console.log(data);
    };

    console.log(errors);

    // console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Form</h1>

            <form
                className="flex flex-col md:w-[50vw] w-full border border-secondary p-6 gap-4 rounded"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Name---------------- */}
                <div className="flex flex-col gap-2">
                    <label className="label-text">Name</label>
                    <input
                        className={`input input-md input-bordered  ${errors.name ? "input-error" : ""
                            }`}
                        placeholder="Name"
                        {...register("name", {
                            //This is the validation
                            required: "You need to provide a name.",
                            maxLength: {
                                value: 20,
                                message: "The name needs to be less than 20 characters."
                            }
                        })}
                    />
                    {errors?.name && (
                        <span className="text-error">{errors.name.message}</span>
                    )}
                </div>

                {/* Description---------------- */}
                <div className="flex flex-col gap-2">
                    <label className="label-text">Description</label>
                    <div className="flex flex-col relative">
                        <input
                            type="text"
                            className={`input input-md input-bordered w-full  ${errors.description ? "input-error" : ""
                                }`}
                            placeholder="Description"
                            {...register("description", {
                                //This is the validation
                                required: "You need to provide a description",
                                maxLength: {
                                    value: 1000,
                                    message: "The description needs to be less than 20 characters."
                                }
                            })}
                        />

                        {errors?.description && (
                            <span className="text-error"> {errors.description.message}</span>
                        )}
                    </div>
                </div>

                {/* Image---------------- */}

                <div className="flex flex-col gap-2">
                    <label htmlFor="image-url" className="block text-sm font-medium leading-6 text-gray-900">Image</label>
                    <div className="flex flex-col relative">
                        <input id="image-url" name="image-url" type="url" className={`input input-md input-bordered w-full  ${errors.image ? "input-error" : ""
                            }`}
                            placeholder="https://fastly.picsum.photos/id/791/200/300.jpg?hmac=Ah_2kp5UqnZv5O0c333s3M4p-FqkCZ6ViRd1V_pAHYk"
                            {...register("image", {
                                //This is the validation
                                required: "You need to provide an image",

                            })} />
                        {errors?.image && (
                            <span className="text-error"> {errors.image.message}</span>
                        )}
                    </div>
                </div>

                {/* State---------------- */}
                <div className="flex flex-col gap-2">
                    <label className="label-text">State</label>
                    <select
                        className={`select select-bordered select-md ${errors.state ? "input-error" : ""
                            }`}
                        name="state"
                        id="state"
                        {...register("state", {
                            //This is the validation
                            required: {
                                value: "Choose an option",
                                message: "You need to specify the state."
                        }
                        })}

                    >
                        <option value="nuevo">Choose an option</option>
                        <option value="nuevo">Nuevo</option>
                        <option value="usado">Usado</option>
                        <option value="deteriorado">Deteriorado</option>
                    </select>
                    {errors?.state && (
                        <span className="text-error"> {errors.state.message}</span>
                    )}
                </div>

                {/* Published Date---------------- */}
                <div className="flex flex-col gap-2">
                    <label className="label-text">Published Date</label>
                    <div className="flex flex-col relative">
                        <input
                            type="datetime-local"
                            className={`input input-md input-bordered w-full  ${errors.publishedDate ? "input-error" : ""
                                }`}
                            placeholder="Published Date"
                            {...register("publishedDate", {
                                //This is the validation
                                required: "You need to provide the current date.",

                            })}
                        />

                        {errors?.publishedDate && (
                            <span className="text-error"> {errors.publishedDate.message}</span>
                        )}
                    </div>
                </div>

                <input
                    className="btn bg-blue-400 text-black rounded w-fit place-self-center uppercase"
                    type="submit"
                    value="publish"
                />


            </form >
        </div >
    );
}