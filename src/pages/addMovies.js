import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const AddMovies = () => {
  const navigation = useNavigate();
  const { auth, user, setMovies } = useOutletContext();

  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [subTitle, setSubTitle] = useState();
  const [img, setImg] = useState();

  useEffect(() => {
    if (!auth) navigation("/");
  });

  const submit = async (event) => {
    event.preventDefault();
    const data = {
        name: name,
        desc: desc,
        subTitle: subTitle,
        img: img,
        user: user.email,
    }
    setMovies((prevState) => {
        const arr = JSON.parse(localStorage.getItem('movies'));
        console.log(typeof arr)
        arr.push(data);
        localStorage.setItem('movies', JSON.stringify(arr));
        return [...prevState, ...[data]];
    })
  }

  const fileToBase64 = (event) => {
    const file = event.target.files;
    if(!file && !file[0]) return;
    console.log(file)
    const reader = new FileReader();
    reader.onload = () => {
        setImg(reader.result)
    }
    reader.readAsDataURL(file[0]);
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input onChange={(event) => {setName(event.target.value)}} type="text" placeholder="Name"></input>
        <input onChange={(event) => {setSubTitle(event.target.value)}} type="text" placeholder="Subtitle"></input>
        <input onChange={(event) => {setDesc(event.target.value)}} type="text" placeholder="Description"></input>
        <label className="nav-link">Upload Image<input onChange={fileToBase64} type="file" placeholder="Description"></input></label>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovies;
