// Edit this file to update site content (contact details, services, projects, team).
export const contact = { email:'zentronetworks@gmail.com', phone:'+91 63813 37271', location:'Tamil Nadu, India' }
export const phoneHref='tel:+916381337271'
export const social = [] // add [label, url] pairs here once official social profiles exist
export const services = [
 ['Code2','Custom Software Development','Tailored applications designed around how your business actually works.','We plan, design and build software around your workflows, from internal business tools to customer-facing platforms.'],
 ['Globe','Website Development','Fast, accessible and maintainable websites that represent your brand well.','Responsive, accessible websites built to load quickly and to be easy to update as your business grows.'],
 ['Smartphone','Mobile Application Development','Mobile apps for Android and iOS, from first prototype to release.','Mobile apps with a consistent experience, covering interface design, development and release.'],
 ['PenTool','UI/UX Design','Research-led interface design that is clear to use and consistent to build.','Interface and experience design that makes products clear to use, from wireframes to a finished visual system.'],
 ['Cloud','Cloud Solutions','Reliable cloud architecture, deployment and scaling.','Cloud setup and deployment so applications stay available, secure and ready to scale.'],
 ['Compass','IT Consulting','Practical technology guidance for planning, tooling and delivery.','Practical guidance on technology choices, architecture and delivery planning before you commit to a build.'],
 ['LifeBuoy','Software Maintenance and Support','Ongoing updates, fixes and monitoring after launch.','Ongoing fixes, updates and improvements so your software keeps working as your needs change.'],
 ['Workflow','Digital Transformation','Moving manual processes onto modern, connected systems.','Replacing manual or disconnected processes with connected digital systems that save time.'],
]
export const values = ['Innovation','Integrity','Quality','Collaboration','Customer Commitment','Continuous Improvement']
export const why = [['Client-focused development','We start from your goals, not our tooling.'],['Scalable solutions','Foundations that grow with your users and data.'],['Modern technologies','Current, well-supported stacks.'],['Quality-driven engineering','Reviewed, tested and documented work.'],['Transparent communication','Clear progress updates and honest timelines.'],['Continuous support','We stay available after launch.']]
export const tech = ['React','Java','Python','JavaScript','Node.js','MongoDB','SQL','AWS','Git','Docker']
export const techSlug = {React:'react',Java:'openjdk',Python:'python',JavaScript:'javascript','Node.js':'nodedotjs',MongoDB:'mongodb',SQL:'postgresql',AWS:'amazonwebservices',Git:'git',Docker:'docker'}
// Add a project by adding one object here; its page and card are generated automatically.
export const disciplines = [['Code2','Engineering','Web, mobile and backend development.'],['PenTool','Design','Interface and experience design.'],['Cloud','Cloud and infrastructure','Deployment, hosting and reliability.'],['LifeBuoy','Support','Maintenance and ongoing improvements.']]
export const team = [] // add { name, role, bio, photo:'/team/name.jpg', leader:true } objects to show profiles on the Team page
const shots=(k,n)=>[{src:`/projects/${k}.jpg`,label:`${n} showcase`},{src:`/projects/${k}-desktop.jpg`,label:`${n} desktop view`},{src:`/projects/${k}-mobile.jpg`,label:`${n} mobile view`}]
const status='Completed sample / Live demo'
// Add a project by adding one object here; its card and detail page are generated automatically.
export const projects = [
 { slug:'building-enterprise-website', name:'Building Enterprise Website', category:'Construction and Interior Design Website', status, image:'/projects/buildcraft.jpg', live:'https://building-web-zeta.vercel.app/', shots:shots('buildcraft','Building Enterprise Website'),
   description:'A business website for construction and interior design services, with packages, a project gallery and consultation booking.',
   tech:['Deployed on Vercel'],
   overview:'A modern construction and interior design business website designed to showcase residential construction, villa projects, modular kitchens, office interiors, and architectural services. It provides visitors with information about services, pricing packages, project galleries, and consultation booking.',
   problem:'Construction and interior design businesses need a professional digital presence to showcase their services, build customer confidence, display completed work, and make it easier for potential clients to enquire about projects.',
   solution:'A responsive business website that presents construction and interior design services in an organized manner, highlights available packages, showcases project galleries, and provides consultation and enquiry options.',
   features:['Modern homepage and business introduction','Construction and interior design service sections','Residential, villa, kitchen and office project categories','Pricing and package presentation','Project gallery','Consultation booking section','Customer enquiry form','Contact information and responsive navigation'] },
 { slug:'restaurant-ordering-website', name:'Restaurant Ordering Website', category:'Restaurant Website', status, image:'/projects/gustobites.jpg', live:'https://restaurantapp-psi-beryl.vercel.app/', shots:shots('gustobites','Restaurant Ordering Website'),
   description:'A food-focused restaurant website with menu categories, chef specials, offers and restaurant information.',
   tech:['Next.js','Deployed on Vercel'],
   overview:'A modern restaurant website designed to present food items, popular categories, chef specials, promotional offers, and restaurant information. It provides customers with an attractive interface to explore the menu and discover food offerings.',
   problem:'Restaurants need an engaging online platform where customers can explore food options, discover special offers, understand the restaurant\'s offerings, and conveniently navigate towards ordering and enquiries.',
   solution:'A responsive restaurant website with an attractive food-focused interface, menu categories, promotional offers, featured dishes, restaurant information, and customer-facing navigation.',
   features:['Modern restaurant homepage','Food categories and menu browsing','Chef\'s special dishes','Promotional offers and discount highlights','Food images and product presentation','Restaurant information','Customer testimonials section','Contact and navigation sections','Responsive user interface'] },
 { slug:'novacart-ecommerce-website', name:'E-commerce Website: NovaCart', category:'E-commerce Website', status, image:'/projects/novacart.jpg', live:'https://e-commerce-teal-nine-73.vercel.app/', shots:shots('novacart','NovaCart'),
   description:'NovaCart is an online storefront sample for premium tech and lifestyle products.',
   tech:['Deployed on Vercel'],
   overview:'NovaCart is a modern e-commerce website sample for premium tech and lifestyle products, including phones, laptops, audio and wearables, according to the site\'s own description.',
   problem:'Online businesses need an organized digital storefront where customers can discover products, explore product information, and navigate through a convenient shopping experience.',
   solution:'A responsive e-commerce storefront that presents products to customers in a clear, browsable layout. Open the live demo to explore the full experience.',
   features:['Online storefront for premium tech and lifestyle products','Responsive layout for mobile and desktop','Branded NovaCart interface'] },
]

export const expertise = [
 ['Code2','Software Engineering','Building scalable web applications, backend systems, APIs, and custom software solutions.',['Web applications','Backend systems','APIs','Custom software']],
 ['PenTool','UI/UX & Product Design','Creating intuitive interfaces and user experiences that make digital products simple and engaging.',['Interface design','User experience','Product design']],
 ['Cloud','Cloud & Infrastructure','Providing reliable deployment, cloud infrastructure, hosting, and scalable application environments.',['Deployment','Cloud infrastructure','Hosting','Scalable environments']],
 ['LifeBuoy','Quality & Technical Support','Ensuring application reliability through testing, maintenance, troubleshooting, and continuous improvements.',['Testing','Maintenance','Troubleshooting','Continuous improvement']],
]
