import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FilePen, PencilIcon, Plus, UploadCloud, Trash2, X as XIcon } from 'lucide-react'

const dummyResumeData = [
  { id: 1, title: 'Resume 1', updatedAt: '2023-10-01' },
  { id: 2, title: 'Resume 2', updatedAt: '2023-10-05' },
  { id: 3, title: 'Resume 3', updatedAt: '2023-10-10' }
]

const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']

const Dashboard = () => {
  const [allResume, setAllResume] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const navigate = useNavigate()

  const handleEdit = (id) => {
    navigate(`/app/builder/${id}`)
  }

  const handleDelete = (id) => {
    setAllResume((prev) => prev.filter((r) => r.id !== id))
  }

  const loadAllResume = async () => {
    await Promise.resolve()
    setAllResume(dummyResumeData)
  }

  const createResume = async (event) => {
    event.preventDefault()
    setShowCreateResume(false)
    navigate(`/app/builder/res123`)
  }

  // Fix #2: uploadResume function was missing — added it
  const uploadResume = async (event) => {
    event.preventDefault()
    setShowUploadResume(false)
    setTitle('')
    setResume(null)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAllResume()
  }, [])

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, Joe Doe</p>
        <div className='flex gap-4'>
          <button onClick={() => setShowCreateResume(true)} className='w-full bg-white sm:w-36 h-48 flex flex-col items-center
            justify-center rounded-lg gap-2 text-slate-600 border border-dashed
            border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all
            duration-300 cursor-pointer'>
            <Plus className='w-11 h-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full'/>
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
          </button>
          <button onClick={() => setShowUploadResume(true)} className='w-full bg-white sm:w-36 h-48 flex flex-col items-center
            justify-center rounded-lg gap-2 text-slate-600 border border-dashed
            border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all
            duration-300 cursor-pointer'>
            <UploadCloud className='w-11 h-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full'/>
            <p className='text-sm group-hover:text-green-600 transition-all duration-300'>Upload Existing</p>
          </button>
        </div>

        <hr className='border-slate-300 my-6 sm:w-[305px]'/>

        <div className='grid grid-cols-2 sm:flex gap-4'>
          {allResume.map((resumeItem, index) => {
            const baseColor = colors[index % colors.length]
            return (
              <button
                key={resumeItem.id}
                className='relative w-full sm:w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer'
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}48)`,
                  borderColor: baseColor + '40'
                }}
                onClick={() => handleEdit(resumeItem.id)}
              >
                <FilePen className="w-7 h-7 group-hover:scale-105 transition-all" style={{ color: baseColor }} />
                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{ color: baseColor }}>
                  {resumeItem.title}
                </p>
                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{ color: baseColor + '90' }}>
                  {/* Fix #1: upDateAt typo fixed to updatedAt */}
                  Updated on {resumeItem.updatedAt ? new Date(resumeItem.updatedAt).toLocaleDateString() : '—'}
                </p>

                {/* Fix #3: titem-center typo fixed to items-center */}
                <div className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                  <Trash2 onClick={(e) => { e.stopPropagation(); handleDelete(resumeItem.id) }} className="w-7 h-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors cursor-pointer" />
                  <PencilIcon onClick={(e) => { e.stopPropagation(); handleEdit(resumeItem.id) }} className="w-7 h-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors cursor-pointer" />
                </div>

              </button>
            )
          })}
        </div>
      </div>

      {/* Fix #4: Create Resume modal — was duplicated, kept one clean version inside component */}
      {showCreateResume && (
        <form
          onSubmit={createResume}
          onClick={() => setShowCreateResume(false)}
          className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'
        >
          <div
            onClick={e => e.stopPropagation()}
            className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'
          >
            <h2 className='text-xl font-bold mb-4'>
              Create a Resume
            </h2>

            <input onChange={(e) => setTitle(e.target.value)} value={title}
              type="text"
              placeholder='Enter resume title'
              className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600'
              required
            />

            <button
              className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
            >
              Create Resume
            </button>

            <XIcon
              className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
              onClick={() => {
                setShowCreateResume(false);
                setTitle('')
              }}
            />
          </div>
        </form>
      )}

      {/* Fix #5: Upload modal moved inside component, UploadResume function added */}
      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          onClick={() => setShowUploadResume(false)}
          className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'
        >
          <div
            onClick={e => e.stopPropagation()}
            className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'
          >
            <h2 className='text-xl font-bold mb-4'>
              Upload Resume
            </h2>

            <input onChange={(e) => setTitle(e.target.value)} value={title}
              type="text"
              placeholder='Enter resume title'
              className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600'
              required
            />

            {/* Fix #6: Fixed malformed <label/> self-closing tag */}
            <div>
              <label htmlFor="resume-input" className="w-full flex flex-col items-center px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 transition-colors">
                Select Resume File
              </label>
              <input
                id="resume-input"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => setResume(e.target.files[0])}
              />
              <div className="mt-2 p-2 bg-gray-300 rounded">
                {resume ? (
                  <p className="text-sm text-gray-600">{resume.name}</p>
                ) : (
                  <p className="text-sm text-gray-500">No file selected</p>
                )}
              </div>
            </div>

            <button
              className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
            >
              Upload Resume
            </button>

            <XIcon
              className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
              onClick={() => {
                setShowUploadResume(false);
                setTitle('')
                setResume(null)
              }}
            />
          </div>
        </form>
      )}

    </div>
  )
}

export default Dashboard