import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveProduct } from "../features/productSlice";

const AddProduct = () => {
	const [input, setInput] = useState({
		title: "",
		price: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChangeInput = (e) => {
		const key = e.target ? e.target.name : e.name;
		const value = e.target ? e.target.value : e.value;

		setInput({
			...input,
			[key]: value,
		});
	};

	const createProduct = async (e) => {
		e.preventDefault();
		await dispatch(saveProduct(input));
		navigate("/");
	};

	return (
		<div>
			<form className="box mt-5" onSubmit={createProduct}>
				<div className="field">
					<label className="label">Title</label>
					<div className="control">
						<input
							type="text"
							className="input"
							placeholder="title"
							name="title"
							value={input.title}
							onChange={handleChangeInput}
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Price</label>
					<div className="control">
						<input
							type="text"
							className="input"
							placeholder="price"
							name="price"
							value={input.price}
							onChange={handleChangeInput}
						/>
					</div>
				</div>
				<div className="field">
					<button className="button is-success">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default AddProduct;
