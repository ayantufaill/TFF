import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import {
  Plus, Edit, Trash2, Save, Video, List, BookOpen,
  LayoutGrid, Settings, Monitor, Users, BarChart3,
  ChevronRight, MoreVertical, Search, Globe, Lock,
  PlusCircle, Sparkles, Image as ImageIcon, ExternalLink,
  Layers, Package, ChevronDown, Check, Menu, X
} from 'lucide-react';
import {
  getCourses, saveMainCourse, saveLevel, saveModule,
  saveAssessment, MainCourse, Level, Module,
  Assessment, getAssessment, deleteMainCourse,
  deleteLevel, deleteModule
} from '../services/courseService';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export default function AdminPanel() {
  const [courses, setCourses] = useState<MainCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Partial<MainCourse> | null>(null);
  const [editingLevel, setEditingLevel] = useState<Partial<Level> | null>(null);
  const [editingModule, setEditingModule] = useState<Partial<Module> | null>(null);
  const [editingAssessment, setEditingAssessment] = useState<Partial<Assessment> | null>(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
      if (data.length > 0 && !activeTab) {
        setActiveTab(data[0]._id);
      }
    } catch (err) {
      toast.error('Failed to synchronize with server');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCourse = async () => {
    if (!editingCourse) return;
    try {
      await saveMainCourse(editingCourse);
      toast.success('Course manifest updated');
      setEditingCourse(null);
      fetchData();
    } catch (err) {
      toast.error('Failed to commit course changes');
    }
  };

  const handleSaveLevel = async () => {
    if (!editingLevel) return;
    try {
      await saveLevel(editingLevel);
      toast.success('Curriculum level updated');
      setEditingLevel(null);
      fetchData();
    } catch (err) {
      toast.error('Failed to update level structure');
    }
  };

  const handleSaveModule = async () => {
    if (!editingModule) return;
    try {
      await saveModule(editingModule);
      toast.success('Learning module synchronized');
      setEditingModule(null);
      fetchData();
    } catch (err) {
      toast.error('Failed to save module data');
    }
  };

  const handleSaveAssessment = async () => {
    if (!editingAssessment) return;
    try {
      await saveAssessment(editingAssessment);
      toast.success('Assessment bank updated');
      setEditingAssessment(null);
    } catch (err) {
      toast.error('Failed to secure assessment data');
    }
  };

  const [deleteTarget, setDeleteTarget] = useState<{ type: 'course' | 'level' | 'module', id: string } | null>(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === 'course') {
        await deleteMainCourse(deleteTarget.id);
        toast.success('Course removed from database');
        if (activeTab === deleteTarget.id) setActiveTab(courses[0]?._id || '');
      } else if (deleteTarget.type === 'level') {
        await deleteLevel(deleteTarget.id);
        toast.success('Level removed');
      } else if (deleteTarget.type === 'module') {
        await deleteModule(deleteTarget.id);
        toast.success('Module removed');
      }
      fetchData();
    } catch (err) {
      toast.error(`Failed to remove ${deleteTarget.type}`);
    } finally {
      setDeleteTarget(null);
    }
  };

  const loadAssessment = async (levelId: string, levelNumber: number) => {
    try {
      const data = await getAssessment(levelId);
      setEditingAssessment(data);
    } catch (err) {
      setEditingAssessment({
        courseId: levelId,
        level: levelNumber,
        title: `Level ${levelNumber} Final Assessment`,
        description: `Verify mastery of Level ${levelNumber} topics`,
        passingScore: 70,
        questions: []
      });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3]">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-[#2C5F2D]/10 border-t-[#2C5F2D] rounded-full animate-spin mx-auto" />
        <p className="text-[#2C5F2D] font-black tracking-widest text-sm uppercase">Initializing Studio</p>
      </div>
    </div>
  );

  const activeCourse = courses.find(c => c._id === activeTab);

  return (
    <div className="bg-[#FAF8F3] flex h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)]" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* MOBILE SIDEBAR BACKDROP */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`admin-sidebar-backdrop ${sidebarOpen ? 'sidebar-open' : ''}`}
      />

      {/* SIDEBAR — uses CSS classes for responsive show/hide */}
      <aside
        className={`admin-sidebar bg-white h-full overflow-hidden ${sidebarOpen ? 'sidebar-open' : ''}`}
        style={{ borderRight: '4px solid rgba(44,95,45,0.1)' }}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-50 bg-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#2C5F2D] flex items-center justify-center shadow-sm">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-900 leading-none mb-1 tracking-tight">Studio</h2>
              <p className="text-[10px] font-bold text-[#C9A961] uppercase tracking-widest">Administrator</p>
            </div>
            {/* Mobile close button — hidden on desktop via CSS */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="admin-mobile-close p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              style={{ display: 'none' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <Input
              placeholder="Search curriculum..."
              className="pl-10 bg-gray-50 border-none rounded-xl text-sm h-11 focus-visible:ring-1 focus-visible:ring-[#2C5F2D]/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Course List - Internally Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-white">
          <div className="flex items-center justify-between px-3 mb-6">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Learning Paths</h3>
            <button
              onClick={() => setEditingCourse({ title: '', description: '', order: courses.length + 1, category: 'General' })}
              className="text-[#C9A961] hover:text-[#B89751] transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())).map(course => (
              <button
                key={course._id}
                onClick={() => { setActiveTab(course._id); setSidebarOpen(false); }}
                className={`w-full text-left p-4 rounded-2xl transition-all border-2 ${activeTab === course._id
                  ? 'bg-white border-[#2C5F2D] shadow-sm'
                  : 'bg-white border-transparent hover:bg-gray-50 text-gray-600'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${activeTab === course._id ? 'bg-[#2C5F2D] text-white shadow-inner' : 'bg-gray-100 text-[#2C5F2D]'
                    }`}>
                    {course.title.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-bold text-sm truncate leading-tight ${activeTab === course._id ? 'text-[#2C5F2D]' : 'text-gray-700'}`}>{course.title}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${activeTab === course._id ? 'text-[#2C5F2D]/60' : 'text-gray-400'}`}>
                      {course.levels.length} Levels
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 bg-white border-t border-gray-50">
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] font-bold text-[#2C5F2D] uppercase tracking-widest">Status: Online</p>
              </div>
              <p className="text-[10px] text-gray-400 font-medium tracking-tight">Syncing Master Database</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <section className="flex-1 bg-[#FAF8F3] overflow-y-auto h-full custom-scrollbar">
        <div className="admin-content-padding max-w-7xl mx-auto" style={{ padding: '2rem 2rem' }}>
          {!activeCourse ? (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="admin-mobile-toggle items-center gap-2 mb-8 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 text-[#2C5F2D] font-bold text-sm"
                style={{ display: 'none' }}
              >
                <Menu className="w-5 h-5" /> Open Sidebar
              </button>
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6">
                <LayoutGrid className="w-10 h-10 text-gray-200" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Select a Learning Path</h2>
              <p className="text-gray-500 max-w-sm mb-8 font-medium">Choose a course from the sidebar to manage its curriculum levels and modules.</p>
              <Button onClick={() => setEditingCourse({ title: '', description: '', order: courses.length + 1, category: 'General' })} className="bg-[#2C5F2D] text-white rounded-xl h-12 px-6 font-bold shadow-sm">
                Create New Course
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Header */}
              <header className="flex flex-col gap-6 pb-12 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {/* Mobile sidebar toggle */}
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="admin-mobile-toggle items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 text-[#2C5F2D]"
                    style={{ display: 'none', flexShrink: 0 }}
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <Badge className="bg-[#2C5F2D]/5 text-[#2C5F2D] border-none font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                    {activeCourse.category}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <h1 className="admin-title text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-none">{activeCourse.title}</h1>
                  <p className="text-lg text-gray-500 font-medium max-w-2xl leading-relaxed">{activeCourse.description}</p>
                </div>
                <div className="admin-header-actions flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
                  <Button variant="outline" className="bg-white rounded-xl h-10 px-5 font-bold border-gray-200" onClick={() => setEditingCourse(activeCourse)}>
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </Button>
                  <Button variant="outline" className="bg-white rounded-xl h-10 px-5 font-bold text-red-500 hover:bg-red-50 hover:text-red-600 border-red-100" onClick={() => setDeleteTarget({ type: 'course', id: activeCourse._id })}>
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                  <Button className="bg-[#2C5F2D] text-white rounded-xl h-10 px-6 font-bold shadow-sm" onClick={() => setEditingLevel({ mainCourseId: activeTab, level: activeCourse.levels.length + 1, title: '', subtitle: '', color: 'from-[#2C5F2D] to-[#4A8B4D]' })}>
                    <Plus className="w-4 h-4 mr-2" /> New Level
                  </Button>
                </div>
              </header>

              {/* Curriculum Tree */}
              <div className="flex flex-col">
                {activeCourse.levels.sort((a, b) => a.level - b.level).map((level, idx) => (
                  <div key={level._id} className="w-full">
                    {idx > 0 && <div className="h-32 border-t border-gray-100/50 mt-16 mb-16" />}
                    <div className="flex flex-col gap-10">
                      <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center text-white text-xl font-bold shadow-sm ring-4 ring-white`}>
                          {level.level}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 leading-none mb-1 tracking-tight">{level.title}</h3>
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{level.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 font-bold hover:text-[#C9A961]" onClick={() => setEditingLevel(level)}>
                          <Edit className="w-4 h-4 mr-2" /> Level
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 font-bold hover:text-red-500" onClick={() => setDeleteTarget({ type: 'level', id: level._id })}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 font-bold hover:text-[#C9A961]" onClick={() => loadAssessment(level._id, level.level)}>
                          <Sparkles className="w-4 h-4 mr-2" /> Quiz
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                      {level.modules.map((module) => (
                        <Card key={module._id} className="border-gray-100 hover:border-[#C9A961]/30 hover:shadow-lg transition-all rounded-[1.5rem] overflow-hidden bg-white group">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400 group-hover:bg-[#C9A961] group-hover:text-white transition-colors">
                                  {module.number}
                                </div>
                                <h4 className="font-bold text-gray-800 line-clamp-1 text-[15px]">{module.title}</h4>
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setEditingModule(module)} className="p-1.5 text-gray-400 hover:text-[#2C5F2D]">
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => setDeleteTarget({ type: 'module', id: module._id })} className="p-1.5 text-gray-400 hover:text-red-500">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 font-medium mb-6 line-clamp-2 leading-relaxed h-8">
                              {module.description || 'No module description provided yet.'}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                              <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${module.videoId ? 'bg-green-500' : 'bg-gray-200'}`} />
                                <span className={`text-[9px] font-bold uppercase tracking-widest ${module.videoId ? 'text-green-600' : 'text-gray-300'}`}>
                                  {module.videoId ? 'Ready' : 'Pending'}
                                </span>
                              </div>
                              <button className="text-[9px] font-bold text-[#C9A961] uppercase tracking-widest flex items-center gap-1">
                                Preview <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <button
                        onClick={() => setEditingModule({ courseId: level._id, number: level.modules.length + 1, title: '', topics: [], formats: [] })}
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-100 rounded-[1.5rem] hover:border-[#C9A961]/30 hover:bg-white transition-all group"
                      >
                        <Plus className="w-5 h-5 text-gray-300 group-hover:text-[#C9A961] mb-2" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">New Module</span>
                      </button>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Course Editor Dialog */}
      <Dialog open={!!editingCourse} onOpenChange={(open) => !open && setEditingCourse(null)}>
        <DialogContent className="admin-dialog">
          <div className="dialog-accent-bar" style={{ background: '#2C5F2D' }} />
          <div className="dialog-header">
            <DialogTitle><h2>{editingCourse?._id ? 'Edit Course' : 'Create New Course'}</h2></DialogTitle>
            <DialogDescription><p>Define the foundation for this learning path.</p></DialogDescription>
          </div>
          <div className="dialog-body">
            <div className="dialog-field">
              <label>Course Title</label>
              <input value={editingCourse?.title || ''} onChange={e => setEditingCourse(prev => ({ ...prev!, title: e.target.value }))} placeholder="e.g., Foundations of Faith" />
            </div>
            <div className="dialog-field">
              <label>Description</label>
              <textarea value={editingCourse?.description || ''} onChange={e => setEditingCourse(prev => ({ ...prev!, description: e.target.value }))} placeholder="Describe what students will learn..." />
            </div>
            <div className="dialog-grid">
              <div className="dialog-field">
                <label>Category</label>
                <input value={editingCourse?.category || ''} onChange={e => setEditingCourse(prev => ({ ...prev!, category: e.target.value }))} />
              </div>
              <div className="dialog-field">
                <label>Display Order</label>
                <input type="number" value={editingCourse?.order || 0} onChange={e => setEditingCourse(prev => ({ ...prev!, order: parseInt(e.target.value) }))} />
              </div>
            </div>
          </div>
          <div className="dialog-footer">
            <button className="btn-cancel" onClick={() => setEditingCourse(null)}>Cancel</button>
            <button className="btn-save" onClick={handleSaveCourse}>Save Changes</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Level Editor Dialog */}
      <Dialog open={!!editingLevel} onOpenChange={(open) => !open && setEditingLevel(null)}>
        <DialogContent className="admin-dialog">
          <div className="dialog-accent-bar" style={{ background: '#C9A961' }} />
          <div className="dialog-header">
            <DialogTitle><h2>{editingLevel?._id ? 'Edit Level' : 'Create New Level'}</h2></DialogTitle>
            <DialogDescription><p>Configure a curriculum milestone.</p></DialogDescription>
          </div>
          <div className="dialog-body">
            <div className="dialog-field">
              <label>Level Title</label>
              <input value={editingLevel?.title || ''} onChange={e => setEditingLevel(prev => ({ ...prev!, title: e.target.value }))} placeholder="e.g., Level 1: Foundations" />
            </div>
            <div className="dialog-field">
              <label>Subtitle</label>
              <input value={editingLevel?.subtitle || ''} onChange={e => setEditingLevel(prev => ({ ...prev!, subtitle: e.target.value }))} placeholder="e.g., Beginner Foundations" />
            </div>
            <div className="dialog-grid">
              <div className="dialog-field">
                <label>Level Number</label>
                <input type="number" value={editingLevel?.level || 0} onChange={e => setEditingLevel(prev => ({ ...prev!, level: parseInt(e.target.value) }))} />
              </div>
              <div className="dialog-field">
                <label>Theme Color</label>
                <input value={editingLevel?.color || ''} onChange={e => setEditingLevel(prev => ({ ...prev!, color: e.target.value }))} placeholder="from-[#2C5F2D] to-[#4A8B4D]" />
              </div>
            </div>
          </div>
          <div className="dialog-footer">
            <button className="btn-cancel" onClick={() => setEditingLevel(null)}>Cancel</button>
            <button className="btn-save" onClick={handleSaveLevel}>Save Level</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Module Editor Dialog */}
      <Dialog open={!!editingModule} onOpenChange={(open) => !open && setEditingModule(null)}>
        <DialogContent className="admin-dialog">
          <div className="dialog-accent-bar" style={{ background: '#2C5F2D' }} />
          <div className="dialog-header">
            <DialogTitle><h2>{editingModule?._id ? 'Edit Module' : 'Add New Module'}</h2></DialogTitle>
            <DialogDescription><p>Configure individual learning components.</p></DialogDescription>
          </div>
          <div className="dialog-body" style={{ maxHeight: '55vh', overflowY: 'auto' }}>
            <div className="dialog-field">
              <label>Module Title</label>
              <input value={editingModule?.title || ''} onChange={e => setEditingModule(prev => ({ ...prev!, title: e.target.value }))} placeholder="e.g., Welcome to Islam" />
            </div>
            <div className="dialog-field">
              <label>Description</label>
              <textarea value={editingModule?.description || ''} onChange={e => setEditingModule(prev => ({ ...prev!, description: e.target.value }))} />
            </div>
            <div className="dialog-grid">
              <div className="dialog-field">
                <label>Module #</label>
                <input type="number" value={editingModule?.number || 0} onChange={e => setEditingModule(prev => ({ ...prev!, number: parseInt(e.target.value) }))} />
              </div>
              <div className="dialog-field">
                <label>Video ID or Link (YouTube)</label>
                <input 
                  value={editingModule?.videoId || ''} 
                  onChange={e => {
                    const val = e.target.value;
                    // Extract ID if it's a URL
                    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
                    const match = val.match(regExp);
                    const videoId = (match && match[7].length === 11) ? match[7] : val;
                    setEditingModule(prev => ({ ...prev!, videoId }));
                  }} 
                  placeholder="e.g., https://www.youtube.com/watch?v=..." 
                />
              </div>
            </div>
            <div className="dialog-field">
              <label>Topics (comma separated)</label>
              <input value={editingModule?.topics?.join(', ') || ''} onChange={e => setEditingModule(prev => ({ ...prev!, topics: e.target.value.split(',').map(t => t.trim()) }))} />
            </div>
          </div>
          <div className="dialog-footer">
            <button className="btn-cancel" onClick={() => setEditingModule(null)}>Cancel</button>
            <button className="btn-save" onClick={handleSaveModule}>Save Module</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assessment Editor Dialog */}
      <Dialog open={!!editingAssessment} onOpenChange={(open) => !open && setEditingAssessment(null)}>
        <DialogContent className="admin-dialog admin-dialog-wide">
          <div className="dialog-accent-bar" style={{ background: '#C9A961' }} />
          <div className="dialog-header">
            <DialogTitle><h2>Assessment Bank</h2></DialogTitle>
            <DialogDescription><p>Manage questions for Level {editingAssessment?.level} assessment.</p></DialogDescription>
          </div>
          <div className="dialog-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <div className="dialog-grid">
              <div className="dialog-field">
                <label>Assessment Title</label>
                <input value={editingAssessment?.title || ''} onChange={e => setEditingAssessment(prev => ({ ...prev!, title: e.target.value }))} />
              </div>
              <div className="dialog-field">
                <label>Passing Score (%)</label>
                <input type="number" value={editingAssessment?.passingScore || 70} onChange={e => setEditingAssessment(prev => ({ ...prev!, passingScore: parseInt(e.target.value) }))} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '8px' }}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Questions ({editingAssessment?.questions?.length || 0})</h3>
                <button
                  className="btn-save"
                  style={{ flex: 'none', height: '32px', fontSize: '0.7rem', padding: '0 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onClick={() => {
                    const newQuestions = [...(editingAssessment?.questions || [])];
                    newQuestions.push({ id: Date.now().toString(), question: '', options: ['', '', '', ''], correctAnswerIndex: 0 });
                    setEditingAssessment(prev => ({ ...prev!, questions: newQuestions }));
                  }}
                >
                  <Plus className="w-3 h-3" /> Add Question
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {editingAssessment?.questions.map((q, qIdx) => (
                  <div key={q.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4 group" style={{ position: 'relative' }}>
                    <button
                      onClick={() => {
                        const newQuestions = editingAssessment.questions.filter((_, i) => i !== qIdx);
                        setEditingAssessment(prev => ({ ...prev!, questions: newQuestions }));
                      }}
                      className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ position: 'absolute', top: '16px', right: '16px' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="dialog-field">
                      <label style={{ color: '#C9A961' }}>Question {qIdx + 1}</label>
                      <input
                        value={q.question}
                        onChange={e => {
                          const newQuestions = [...editingAssessment.questions];
                          newQuestions[qIdx].question = e.target.value;
                          setEditingAssessment(prev => ({ ...prev!, questions: newQuestions }));
                        }}
                        placeholder="Type your question here..."
                        style={{ background: '#fff' }}
                      />
                    </div>
                    <div className="dialog-grid">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2">
                          <div
                            onClick={() => {
                              const newQuestions = [...editingAssessment.questions];
                              newQuestions[qIdx].correctAnswerIndex = optIdx;
                              setEditingAssessment(prev => ({ ...prev!, questions: newQuestions }));
                            }}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer border-2 transition-all ${q.correctAnswerIndex === optIdx ? 'bg-[#2C5F2D] border-[#2C5F2D] text-white shadow-sm' : 'bg-white border-gray-200 text-gray-300'}`}
                          >
                            {q.correctAnswerIndex === optIdx ? <Check className="w-3 h-3" /> : optIdx + 1}
                          </div>
                          <input
                            value={opt}
                            onChange={e => {
                              const newQuestions = [...editingAssessment.questions];
                              newQuestions[qIdx].options[optIdx] = e.target.value;
                              setEditingAssessment(prev => ({ ...prev!, questions: newQuestions }));
                            }}
                            placeholder={`Option ${optIdx + 1}`}
                            style={{ flex: 1, background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '8px 12px', fontSize: '0.8rem', fontWeight: 500, outline: 'none' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="dialog-footer">
            <button className="btn-cancel" onClick={() => setEditingAssessment(null)}>Cancel</button>
            <button className="btn-save" onClick={handleSaveAssessment}>Commit Assessment</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="admin-dialog" style={{ maxWidth: '440px' }}>
          <div className="dialog-accent-bar" style={{ background: '#ef4444' }} />
          <div className="dialog-header" style={{ paddingBottom: '8px' }}>
            <AlertDialogTitle><h2>Are you absolutely sure?</h2></AlertDialogTitle>
            <AlertDialogDescription><p>This action cannot be undone. This will permanently delete the {deleteTarget?.type} and all associated data from the database.</p></AlertDialogDescription>
          </div>
          <div className="dialog-footer">
            <button className="btn-cancel" onClick={() => setDeleteTarget(null)}>Cancel</button>
            <button className="btn-save btn-danger" onClick={confirmDelete}>Delete Permanently</button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
