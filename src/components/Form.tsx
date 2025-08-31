
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


interface FormData {
    id:string
    surname: string,
    othernames: string,  
    date: string
    gender: string, 
    image:string
    issueDate:string
    nin:string
}



const Form:React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<FormData, "id">>({
    surname: "",
    othernames: "",
    date: "",
    gender: "",
    image: "",
    issueDate: "",
    nin: "",
  });

  const IssueDate = () =>{
    const today = new Date()
    const todayAsString:string = today.toDateString().toUpperCase()
    form.issueDate = todayAsString
  }
  IssueDate()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
  };

  const handleDate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const dateInput = e.target.value;
    const date = new Date(dateInput)
    const dateAsText = date.toDateString().toUpperCase()
    const part1 = dateAsText.slice(4,7)
    const part2 = dateAsText.slice(8,10)
    const part3 = dateAsText.slice(11)
    form.date = `${part1} ${part2} ${part3}`
}

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    if (file.size > 1024 * 1024) { 
      alert("Image must be less than 1 MB");
      return;
    }
     const imageTypes = ["image/jpeg", "image/png"];
      if (!imageTypes.includes(file.type)) {
        alert("Only JPG and PNG images are allowed");
        return;
      }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    navigate(`../Id#surname=${encodeURIComponent(form.surname)}&othernames=${encodeURIComponent(
      form.othernames
    )}&date=${encodeURIComponent(form.date)}&gender=${encodeURIComponent(
      form.gender
    )}&issueDate=${encodeURIComponent(
      form.issueDate
    )}&nin=${encodeURIComponent(form.nin)}`);
  };

  const generateNIN = () => {
     const min: number = 0;
     const max: number = 99999999999;
     const NIN = Math.round(Math.random() * (max - min + 1) + min)   
     
     const NINAsString = NIN.toLocaleString()
     const NINAsString2 = NINAsString.replace(/[,]/g, "")
     const part1 = NINAsString2.slice(0,4)
     const part2 = NINAsString2.slice(4,7)
     const part3 = NINAsString2.slice(7)

     form.nin = `${part1}  ${part2}  ${part3}`
  }

  generateNIN()

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">ID Card Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          name="surname"
          value={form.surname}
          onChange={handleChange}
          placeholder="Enter your surname"
          className="border p-2 rounded"
          required
        />
        
        <input
          type="text"
          name="othernames"
          value={form.othernames}
          onChange={handleChange}
          placeholder="Enter your other name(s)"
          className="border p-2 rounded"
          required
        />

       
        <input
          type="date"
          name="date"
          onChange={handleDate}
          placeholder="Date of Birth"
          className="border p-2 rounded"
          required
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageUpload}
          className="border p-2 rounded"
          required
        />

        {form.image && (
          <img
            src={form.image}
            className="w-32 h-32 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Generate Card
        </button>
      </form>
    </div>
    
  )
}

export default Form