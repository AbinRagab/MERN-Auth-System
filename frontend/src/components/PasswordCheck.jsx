import { Check, X } from 'lucide-react'

const PasswordCriteria = ({password})=>{

    
    
    const criteria = [
        {label: "At least 6 chars", met: password?.length >= 6 },
        {label: "contains LowerCase Letter", met: (password?.length > 0 && /[a-z]/.test(password)) },
        {label: "contains UpperCase Letter", met: /[A-Z]/.test(password) },
        {label: "contains A number", met: /\d/.test(password) },
        {label: "contains Special characters", met: /[^a-zA-Z0-9]/.test(password) }
    ]

    return(
        <div className='mt-2 space-y-1'>
                {criteria.map((item)=>{
                  return <div key={item.label} className='flex items-center text-xs'>
                            {item.met?
                                <Check className='text-green-500 mr-2' />
                            :
                                <X className='text-gray-400 mr-2' />
                            }
            
                                <span className={item.met? "text-green-500" : "text-gray-400"}>{item.label}</span>
                                                        
                    </div>     
                })}
        </div>
    )
}

const PasswordCheck = ({password}) => {
    
    const strengthPassword = ({password})=>{
            let strength = 0
            if(password?.length >= 6) strength++
            if(/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
            if(/\d/.test(password)) strength++
            if(/[^a-zA-Z0-9]/.test(password)) strength++        
            return strength
    }

    const strength = strengthPassword({password})

    const getStrengethText = (strength)=>{
        if(strength == 0) return "very weak"
        if(strength == 1) return "weak"
        if(strength == 2) return "fair"
        if(strength == 3) return "good"
        return "Strong"
    }


    const getColor = (strength)=>{
        
        if(strength == 0) return "bg-red-400"
        if(strength == 1) return "bg-red-500"
        if(strength == 2) return "bg-yellow-400"
        if(strength == 3) return "bg-yellow-500"
        return "bg-green-500"
    }

    
    
  return (
    <div>
        <div className='flex justify-between text-xs'>
            <span className='text-gray-400'>Password Strength: </span>
            <span className='text-gray-400'>{getStrengethText(strength)}</span>
        </div>
        <div className='flex space-x-1 mt-3'>
            {[...Array(4)].map((_,idx)=>{
               return  <span className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                    ${idx < strength ? getColor(strength) : "bg-gray-600"}
                    `}></span>
            })}
        </div>
        <PasswordCriteria password={password} />
    </div>
  )
}

export default PasswordCheck


