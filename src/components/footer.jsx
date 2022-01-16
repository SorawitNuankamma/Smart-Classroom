import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Footer() {
  return (
    <footer className="flex flex-row bg-gray-200 px-32 py-10 font-kanit">
      <div>
        <ul>
          <li className="text-lg">ติดต่อเรา</li>
          <li className="mt-2">
            <PhoneIcon />
            <span className="ml-5">095-6370594</span>
          </li>
          <li>
            <EmailIcon />
            <span className="ml-5">sorawit.nuankamma@gmail.com</span>
          </li>
        </ul>
      </div>
    </footer>
  );
}
