import { CVData } from "@/lib/schema";
import Image from "next/image";

export function ModernCorporate({ data }: { data: CVData }) {
  return (
    <div className="w-full h-[1123px] bg-white p-12 text-slate-900 font-sans leading-tight">
      {/* Header */}
      <div className="border-b-[3px] border-blue-600 pb-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 uppercase tracking-wide">{data.fullName || 'FULL NAME'}</h1>
          <p className="text-xl text-blue-600 font-medium">{data.jobTitle || 'Job Title'}</p>
        </div>
        {data.photoUrl && (
          <Image
            src={data.photoUrl}
            alt="Profile"
            width={96}
            height={96}
            unoptimized
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-100"
          />
        )}
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-10">
        {/* Left Column */}
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold text-slate-800 uppercase mb-3 border-b border-slate-200 pb-1">Contact</h2>
            <ul className="text-sm space-y-2 text-slate-600">
              {data.email && <li><span className="font-semibold block text-slate-800 text-xs uppercase">Email</span>{data.email}</li>}
              {data.phone && <li><span className="font-semibold block text-slate-800 text-xs uppercase">Phone</span>{data.phone}</li>}
              {data.city && <li><span className="font-semibold block text-slate-800 text-xs uppercase">Location</span>{data.city}</li>}
              {data.linkedIn && <li><span className="font-semibold block text-slate-800 text-xs uppercase">LinkedIn</span>{data.linkedIn}</li>}
              {data.portfolioUrl && <li><span className="font-semibold block text-slate-800 text-xs uppercase">Portfolio</span>{data.portfolioUrl}</li>}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 uppercase mb-3 border-b border-slate-200 pb-1">Skills</h2>
            {data.primarySkills?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-sm mb-2">Core Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.primarySkills.map(s => (
                    <span key={s} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-sm">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {data.technicalSkills && (
              <div className="mb-4">
                 <h3 className="font-semibold text-sm mb-1">Technical</h3>
                 <p className="text-sm text-slate-600">{data.technicalSkills}</p>
              </div>
            )}
            {data.softSkills && (
              <div>
                 <h3 className="font-semibold text-sm mb-1">Soft Skills</h3>
                 <p className="text-sm text-slate-600">{data.softSkills}</p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {data.careerSummary && (
             <section>
              <h2 className="text-xl font-bold text-slate-800 uppercase mb-3 border-b border-slate-200 pb-1">Profile Summary</h2>
              <p className="text-sm text-slate-700 leading-relaxed text-justify">{data.careerSummary}</p>
             </section>
          )}

          <section>
            <h2 className="text-xl font-bold text-slate-800 uppercase mb-3 border-b border-slate-200 pb-1">Experience</h2>
            {data.jobTitle && (
              <div className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{data.jobTitle}</h3>
                  <span className="text-sm font-semibold text-blue-600">{data.yearsOfExperience} yrs exp</span>
                </div>
                <div className="font-semibold text-slate-700 mb-2">{data.company || "Company Name"}</div>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{data.workDescription}</p>
              </div>
            )}
            {data.achievements && (
              <div className="mt-4">
                <h4 className="font-bold text-sm text-slate-800 mb-1">Key Achievements</h4>
                <p className="text-sm text-slate-600 whitespace-pre-wrap">{data.achievements}</p>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 uppercase mb-3 border-b border-slate-200 pb-1">Education</h2>
            {data.university && (
              <div>
                <h3 className="text-lg font-bold text-slate-900">{data.fieldOfStudy}</h3>
                <div className="flex justify-between items-center mb-1">
                   <span className="font-semibold text-slate-700">{data.university}</span>
                   <span className="text-sm font-semibold text-blue-600">{data.graduationYear}</span>
                </div>
                <p className="text-sm text-slate-500">{data.educationType}</p>
              </div>
            )}
          </section>

          {data.courses && data.courses.length > 0 && (
             <section>
              <h2 className="text-xl font-bold text-slate-800 uppercase mb-3 border-b border-slate-200 pb-1">Courses & Certifications</h2>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
                {data.courses.map((c, i) => (
                  <li key={i}><strong>{c.title}</strong> - {c.institute}</li>
                ))}
              </ul>
             </section>
          )}
        </div>
      </div>
    </div>
  );
}

export function AtsMinimal({ data }: { data: CVData }) {
  return (
    <div className="w-full h-[1123px] bg-white p-14 text-black font-serif leading-snug">
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold uppercase mb-2">{data.fullName || 'FULL NAME'}</h1>
        <p className="text-base mb-2">
          {data.email} {data.phone ? `| ${data.phone}` : ''} {data.city ? `| ${data.city}` : ''}
        </p>
        <p className="text-sm">
           {data.linkedIn} {data.portfolioUrl ? `| ${data.portfolioUrl}` : ''}
        </p>
      </div>

      {data.careerSummary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Summary</h2>
          <p className="text-sm text-justify">{data.careerSummary}</p>
        </section>
      )}

      {(data.jobTitle || data.workDescription) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Experience</h2>
          <div>
            <div className="flex justify-between font-bold text-md mb-1">
              <span>{data.jobTitle || "Job Title"}</span>
              <span>{data.yearsOfExperience ? `${data.yearsOfExperience} Years` : ''}</span>
            </div>
            <div className="italic text-sm mb-2">{data.company || "Company"}</div>
            <p className="text-sm whitespace-pre-wrap">{data.workDescription}</p>
            {data.achievements && (
              <div className="mt-2 text-sm">
                <strong>Achievements:</strong> {data.achievements}
              </div>
            )}
          </div>
        </section>
      )}

      {(data.university || data.fieldOfStudy) && (
        <section className="mb-6">
           <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Education</h2>
           <div className="flex justify-between font-bold text-md">
             <span>{data.university || "University"}</span>
             <span>{data.graduationYear || "Year"}</span>
           </div>
           <div className="text-sm">
             {data.educationType} in {data.fieldOfStudy}
           </div>
        </section>
      )}

      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Skills</h2>
        <div className="text-sm">
           {data.primarySkills?.length > 0 && <p className="mb-1"><strong>Core:</strong> {data.primarySkills.join(', ')}</p>}
           {data.technicalSkills && <p className="mb-1"><strong>Technical:</strong> {data.technicalSkills}</p>}
           {data.softSkills && <p><strong>Interpersonal:</strong> {data.softSkills}</p>}
        </div>
      </section>

      {data.courses && data.courses.length > 0 && (
         <section className="mb-6">
           <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Certifications</h2>
           <ul className="text-sm list-disc pl-5">
             {data.courses.map((c, i) => (
                <li key={i}>{c.title} — {c.institute}</li>
             ))}
           </ul>
         </section>
      )}
    </div>
  );
}

export function CreativeDesigner({ data }: { data: CVData }) {
  return (
    <div className="w-full h-[1123px] bg-[#fdfaf6] flex flex-row">
      {/* Left Sidebar */}
      <div className="w-[35%] bg-[#ffe4e6] p-10 h-full flex flex-col items-center border-r-[8px] border-white">
        {data.photoUrl ? (
          <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden mb-8">
            <Image
              src={data.photoUrl}
              alt="Profile"
              width={160}
              height={160}
              unoptimized
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg bg-pink-200 mb-8 flex items-center justify-center font-bold text-pink-400 text-3xl">
            {data.fullName?.charAt(0) || 'C'}
          </div>
        )}
        
        <div className="w-full space-y-8 text-slate-800">
           <section>
             <h3 className="text-sm font-black uppercase tracking-widest text-[#e11d48] mb-4 text-center">Contact Info</h3>
             <div className="text-xs space-y-3 font-medium flex flex-col items-center text-center">
                {data.email && <div>{data.email}</div>}
                {data.phone && <div>{data.phone}</div>}
                {data.city && <div>{data.city}</div>}
                {data.portfolioUrl && <div className="text-[#e11d48]">{data.portfolioUrl}</div>}
             </div>
           </section>

           <section className="w-full text-center">
             <h3 className="text-sm font-black uppercase tracking-widest text-[#e11d48] mb-4">Skills Stack</h3>
             <div className="flex flex-wrap justify-center gap-2">
                {data.primarySkills?.map(s => (
                  <span key={s} className="px-2 py-1 bg-white text-xs font-bold rounded-lg shadow-sm">{s}</span>
                ))}
             </div>
           </section>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-[65%] p-12 h-full">
        <div className="mb-12">
          <h1 className="text-6xl font-black text-slate-900 leading-none mb-4 tracking-tighter" style={{ fontFamily: "Arial Black" }}>
            {data.fullName?.split(' ')[0] || 'FIRST'}<br/>
            <span className="text-[#e11d48]">{data.fullName?.split(' ').slice(1).join(' ') || 'LAST NAME'}</span>
          </h1>
          <div className="text-xl font-bold tracking-widest uppercase text-slate-400">{data.jobTitle || 'Creative Professional'}</div>
        </div>

        <div className="space-y-10 text-slate-800">
          {data.careerSummary && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-[#e11d48] mb-3">About Me</h2>
              <p className="text-sm font-medium leading-relaxed">{data.careerSummary}</p>
            </section>
          )}

          <section>
            <h2 className="text-sm font-black uppercase tracking-widest text-[#e11d48] mb-3">Experience</h2>
            <div className="relative pl-6 border-l-2 border-[#ffe4e6]">
              <div className="absolute w-3 h-3 bg-[#e11d48] rounded-full -left-[7px] top-1"></div>
              <h3 className="font-bold text-lg">{data.jobTitle || 'Role'}</h3>
              <div className="text-sm font-bold text-slate-400 mb-2">{data.company || 'Company'} — {data.yearsOfExperience} yrs</div>
              <p className="text-sm font-medium leading-relaxed mb-2">{data.workDescription}</p>
              {data.achievements && <p className="text-xs font-semibold text-[#e11d48]">{data.achievements}</p>}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-black uppercase tracking-widest text-[#e11d48] mb-3">Education</h2>
            <div>
               <h3 className="font-bold text-lg">{data.fieldOfStudy || 'Field of Study'}</h3>
               <div className="text-sm font-bold text-slate-400 mb-1">{data.university || 'University'} • {data.graduationYear || 'Year'}</div>
               <p className="text-sm font-medium">{data.educationType}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function ExecutivePremium({ data }: { data: CVData }) {
  return (
    <div className="w-full h-[1123px] bg-white p-12 text-slate-800 font-sans border-t-[16px] border-slate-900">
       <header className="flex justify-between items-end mb-10 pb-6 border-b-2 border-slate-200">
          <div>
             <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-2">{data.fullName || 'FULL NAME'}</h1>
             <h2 className="text-xl font-medium text-slate-500 uppercase tracking-widest">{data.jobTitle || 'Executive Title'}</h2>
          </div>
          <div className="text-right text-sm space-y-1 font-medium text-slate-600">
             <div>{data.email}</div>
             <div>{data.phone}</div>
             <div>{data.city}</div>
             {data.linkedIn && <div className="text-slate-900">{data.linkedIn}</div>}
          </div>
       </header>

       <div className="grid grid-cols-[3fr_1fr] gap-12">
          {/* Main */}
          <div className="space-y-8">
             {data.careerSummary && (
               <section>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Executive Summary</h3>
                 <p className="text-[15px] leading-relaxed font-serif text-slate-700">{data.careerSummary}</p>
                 {data.objectives && <p className="text-[15px] leading-relaxed font-serif text-slate-700 mt-2">{data.objectives}</p>}
               </section>
             )}

             <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Professional Experience</h3>
                <div>
                   <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-xl font-bold text-slate-900">{data.jobTitle || 'Role'}</h4>
                      <span className="text-sm font-bold text-slate-500">{data.yearsOfExperience} yrs</span>
                   </div>
                   <div className="text-lg font-medium text-slate-700 mb-3">{data.company || 'Company'}</div>
                   <p className="text-[15px] leading-relaxed font-serif text-slate-700 mb-3 whitespace-pre-wrap">{data.workDescription}</p>
                   {data.achievements && (
                     <div>
                       <strong className="text-slate-900 text-sm">Key Contributions:</strong>
                       <p className="text-[14px] leading-relaxed font-serif text-slate-700 whitespace-pre-wrap">{data.achievements}</p>
                     </div>
                   )}
                </div>
             </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             {data.photoUrl && (
               <div className="w-full aspect-square bg-slate-100 mb-6">
                 <Image
                   src={data.photoUrl}
                   alt=""
                   width={320}
                   height={320}
                   unoptimized
                   className="w-full h-full object-cover grayscale"
                 />
               </div>
             )}

             <section>
               <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Competencies</h3>
               <ul className="text-sm font-medium space-y-2">
                 {data.primarySkills?.map(s => (
                   <li key={s} className="border-b border-slate-100 pb-1">{s}</li>
                 ))}
               </ul>
             </section>

             <section>
               <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Education</h3>
               <div className="text-sm">
                  <div className="font-bold text-slate-900">{data.university || 'University'}</div>
                  <div className="font-medium text-slate-600 mb-1">{data.fieldOfStudy}</div>
                  <div className="text-slate-400 text-xs">{data.graduationYear} · {data.educationType}</div>
               </div>
             </section>
          </div>
       </div>
    </div>
  );
}

export function StudentFresh({ data }: { data: CVData }) {
  return (
    <div className="w-full h-[1123px] bg-slate-50 p-10 font-sans text-slate-800">
      <div className="bg-emerald-600 rounded-3xl p-8 text-white mb-8 shadow-lg flex justify-between items-center">
         <div>
            <h1 className="text-4xl font-bold mb-2">{data.fullName || 'FULL NAME'}</h1>
            <p className="text-lg text-emerald-100">{data.fieldOfStudy ? `${data.educationType} in ${data.fieldOfStudy}` : 'Student / Fresh Graduate'}</p>
         </div>
         {data.photoUrl && (
            <Image
              src={data.photoUrl}
              alt="Profile"
              width={112}
              height={112}
              unoptimized
              className="w-28 h-28 rounded-2xl object-cover border-4 border-emerald-400"
            />
         )}
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-8">
         <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
               <h2 className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-4">Contact</h2>
               <div className="space-y-3 text-sm">
                  {data.email && <div className="break-all">📧 {data.email}</div>}
                  {data.phone && <div>📱 {data.phone}</div>}
                  {data.city && <div>📍 {data.city}</div>}
                  {data.linkedIn && <div className="break-all">🔗 {data.linkedIn}</div>}
                  {data.githubUrl && <div className="break-all">💻 {data.githubUrl}</div>}
               </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
               <h2 className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-4">Skills</h2>
               <div className="flex flex-wrap gap-2">
                  {data.primarySkills?.map(s => (
                    <span key={s} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">{s}</span>
                  ))}
               </div>
            </div>

            {data.courses && data.courses.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                 <h2 className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-4">Courses</h2>
                 <ul className="text-sm space-y-2">
                    {data.courses.map((c, i) => <li key={i}><strong>{c.title}</strong><br/><span className="text-xs text-slate-500">{c.institute}</span></li>)}
                 </ul>
              </div>
            )}
         </div>

         <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
               <h2 className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-4">Education</h2>
               <div className="mb-2">
                 <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-bold text-slate-900">{data.university || 'University'}</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-bold">{data.graduationYear || 'Year'}</span>
                 </div>
                 <div className="font-medium text-slate-700">{data.fieldOfStudy || 'Field'}</div>
                 <p className="text-sm text-slate-500 mt-1">{data.educationType}</p>
               </div>
            </div>

            {(data.workDescription || data.careerSummary) && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                 <h2 className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-4">Experience & Details</h2>
                 {data.careerSummary && <p className="text-sm mb-4">{data.careerSummary}</p>}
                 {data.jobTitle && <h3 className="font-bold text-slate-900 mb-1">{data.jobTitle} {data.company ? `at ${data.company}` : ''}</h3>}
                 {data.workDescription && <p className="text-sm text-slate-600 whitespace-pre-wrap">{data.workDescription}</p>}
                 {data.activities && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                       <h4 className="font-bold text-sm mb-2">Activities</h4>
                       <p className="text-sm text-slate-600">{data.activities}</p>
                    </div>
                 )}
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
