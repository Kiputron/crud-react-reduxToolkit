import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getProducts,
	productSelectors,
	updateProduct,
} from "../features/productSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
	const [input, setInput] = useState({
		title: "",
		price: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const product = useSelector((state) =>
		productSelectors.selectById(state, id)
	);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	useEffect(() => {
		if (product) {
			setInput({
				...product,
			});
		}
	}, [product]);

	const handleChangeInput = (e) => {
		const key = e.target ? e.target.name : e.name;
		const value = e.target ? e.target.value : e.value;

		setInput({
			...input,
			[key]: value,
		});
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		await dispatch(updateProduct(input));
		navigate("/");
	};

	return (
		<div>
			<form className="box mt-5" onSubmit={handleUpdate}>
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
					<button className="button is-success">Update</button>
				</div>
			</form>
		</div>
	);
};

export default EditProduct;
