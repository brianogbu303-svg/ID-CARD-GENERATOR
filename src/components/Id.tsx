import { useParams} from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useRef} from "react";
import * as htmlToImage from "html-to-image";
import '../css/Form.css'

interface FormData {
  id:string
  surname: string,
  othernames: string, 
  date: string, 
  gender: string, 
  image:string
  issueDate: string
  nin: string
}


const Id = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id)
  const cardRef = useRef<HTMLDivElement>(null);
  
  const data = id ? localStorage.getItem(`idcard-${id}`) : null;
  const state: FormData = data ? JSON.parse(data) : null;
  
  
  const pageUrl = `${window.location.origin}/Id/${state.id}`;
  
  
  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${state.surname}-id-card.png`;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };
  

  



  return (
    <div className="p-12 grid w-2xl ml-4 max-[250px]:items-center max-[250px]:p-1  max-[250px]:overflow-hidden items-center">

      <div
        ref={cardRef}
        className="border bg-[url('../assets/ID_Background.jpg')] max-[250px]:scale-[0.6] bg-cover bg-no-repeat relative rounded-lg p-6 pb-20 mt-4 h w-full  text-center shadow-md bg-white"
      >
        
        <div className="relative font-mono">
          
        <div className="font-sans ml-4.5">
        <div className="text-2xl font-bold text-left text-[#01c570e7]">FEDERAL REPUBLIC OF NIGERIA</div>
        <div className="text-xl font-bold -mt-1.5 text-left">DIGITAL NIN SLIP</div>
        </div>
        
        
        <div className="mt-2.5">
        <div className="float-left">
        {state.image && (
          <img
          src={state.image}
          alt="Profile"
          className="w-28 h-36 mx-auto object-cover"
          />
        )}
        </div>

        <div className="float-left  w-3xs mt-3 text-gray-300 text-left ml-5">

        <div className="w-full leading-4">SURNAME/NOM <p className="text-black tracking-[3px]">{state.surname}</p></div>
        <div className=" w-full leading-4 mt-4">GIVEN NAMES/PRENOMS <p className="text-black tracking-[3px]">{state.othernames}</p></div>
        <div className="inline-flex w-full mt-4">
        <div className=" w-3/5 leading-4">DATE OF BIRTH: <p className="text-black tracking-[3px]">{state.date}</p></div>
        <div className="leading-4 ml-3">SEX/SEXE: <p className="text-black tracking-[3px]">{state.gender}</p></div>
        </div>
        </div>
        </div>

      <div className="absolute right-0 -top-1">
        <div className="mt-4 flex justify-center">
          <QRCodeCanvas value={pageUrl} size={140} />
        </div>
        <div className="font-semibold text-xl -mt-2.5 pt-2">
          NGA
        </div>
        <div>
          ISSUE DATE
        </div>
        <div className="-mt-1.5">
          {state.issueDate}
        </div>
      </div>
      </div>
      <div className="absolute bottom-0 font-semibold w-full">
        National Identifiction Number (NIN)
        <div className="text-5xl font-normal font-mono -mt-1.5">{state.nin}</div>
      </div>
      </div>

      <button
        onClick={handleDownload}
        className="bg-green-500 max-[250px]:scale-[0.6] max-[250px]:mt-0 text-white p-2 rounded mt-4 hover:bg-green-600"
        >
        Download ID
      </button>
    </div>
  )
}

export default Id