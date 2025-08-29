import Frank from '../assets/profilefrank.jpg'
import Testimonial from './Testimonial'

const testimonials = [
  {
    contentText:
      "This app saved me hours of rewriting my job applications. The AI suggestions felt natural and professional.",
    userName: "Sarah Johnson",
    profilePicture: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Marketing Specialist",
  },
  {
    contentText:
      "The layout is clean and easy to use. I was able to generate cover letters in minutes instead of stressing for days.",
    userName: "James Patel",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Software Engineer",
  },
  {
    contentText:
      "What impressed me the most is how personalized the recommendations felt. It's like having a career coach in your pocket.",
    userName: "Emily Chen",
    profilePicture: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "UX Designer",
  },
  {
    contentText:
      "I landed 3 interviews within two weeks after using this tool. Highly recommend for anyone on the job hunt.",
    userName: "Michael Thompson",
    profilePicture: "https://randomuser.me/api/portraits/men/12.jpg",
    role: "Data Analyst",
  },
]


export default function Testimonials(){
    return(
        <div className = "flex flex-row gap-4 absolute bottom-4 items-center justify-center">
            {testimonials.map((testimonial,key) =>(
                <Testimonial
                key = {key}
                contentText= {testimonial.contentText}
                userName= {testimonial.userName}
                profilePicture= {testimonial.profilePicture}
                role = {testimonial.role}
                />
            ))}
        </div>
    )
}