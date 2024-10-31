import guitarImg from '../../assets/guita.png'
import googleImg from '../../assets/google.png'
import close from '../../assets/close.svg'
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/firebase';

type  PopupProps ={
  setLoginPop : (value:boolean) => void;
}
const Login = ({setLoginPop}: PopupProps) => {

  const googleSignIn = async ()=>{
    try{
      await signInWithPopup(auth,googleProvider)
      setLoginPop(false);

    }catch(error){
      console.log(error)
    }
       
  }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
   
    <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:w-96 sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <img className='w-6 absolute z-10 top-4 right-4 cursor-pointer' onClick={()=>setLoginPop(false)} src={close} alt="" />
        
            <div className="sm:flex sm:items-start">
            
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                
                <div className="mt-2">
                    <img src={guitarImg} alt="" className='w-20 h-20 ml-32'/>
                  <p className="text-base font-medium mt-4 text-center">Help us become one of the safest places <br/>to buy and sell</p>
                  <div className='flex border-black border-2 p-2 rounded-md mt-12 cursor-pointer'>
                    
                    <svg width="22px" height="22px" viewBox="0 0 1024 1024" data-aut-id="icon" className="_2oC8g" fillRule="evenodd"><path className="rui-w4DG7 _3Z_D3" d="M743.68 85.333l66.987 67.84v701.227l-63.573 84.267h-471.253l-62.507-85.333v-700.373l67.627-67.627h462.72zM708.053 170.667h-391.893l-17.493 17.707v637.653l20.053 27.307h385.92l21.333-27.52v-637.653l-17.92-17.493zM512 682.667c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667z"></path></svg>
                    <h1 className='font-semibold ml-4'>Continue with phone</h1>
                  </div>
                  <div onClick={ googleSignIn} className='flex border-gray-200 border-2 p-2 rounded-md mt-12 cursor-pointer'>
                   <img src={googleImg} alt="" className='w-6 h-6 ' />
                    <h1 className='font-semibold ml-12 cursor-pointer'>Continue with Google</h1>
                  </div>
                  <h1 className='text-center mt-4'>OR</h1>
                  <h1 className='text-center mt-4 underline cursor-pointer'>Login with Email</h1>
                  <p className='text-center text-xs mt-32'>All your personal details are safe with us.</p>
                  <p className='text-center text-xs mt-4'>If you continue, you are accepting <span className='text-blue-600 cursor-pointer'>OLX Terms and <br/>Conditions and Privacy Policy </span></p>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Login;
