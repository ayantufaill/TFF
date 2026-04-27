import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Send, Reply, Edit2, Trash2, X } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { useAuth } from '../context/AuthContext';
import { getComments, addComment, updateComment, deleteComment, Comment } from '../services/commentService';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes";
  return Math.floor(seconds) + " seconds";
};

interface CommentSectionProps {
  moduleId: string;
}

export default function CommentSection({ moduleId }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(moduleId);
        setComments(data);
      } catch (err) {
        console.error('Failed to fetch comments', err);
      }
    };
    fetchComments();
  }, [moduleId]);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) return;
    setLoading(true);
    try {
      const comment = await addComment(moduleId, newComment);
      setComments([comment, ...comments]);
      setNewComment('');
      toast.success('Comment posted');
    } catch (err) {
      toast.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim() || !user) return;
    setLoading(true);
    try {
      const reply = await addComment(moduleId, replyContent, parentId);
      setComments([...comments, reply]);
      setReplyContent('');
      setReplyTo(null);
      toast.success('Reply posted');
    } catch (err) {
      toast.error('Failed to add reply');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editContent.trim()) return;
    setLoading(true);
    try {
      const updated = await updateComment(commentId, editContent);
      setComments(comments.map(c => c._id === commentId ? updated : c));
      setEditingId(null);
      setEditContent('');
      toast.success('Comment updated');
    } catch (err) {
      toast.error('Failed to update comment');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteComment(deleteTargetId);
      setComments(comments.filter(c => c._id !== deleteTargetId && c.parentId !== deleteTargetId));
      toast.success('Comment removed');
    } catch (err) {
      toast.error('Failed to delete comment');
    } finally {
      setDeleteTargetId(null);
    }
  };

  const renderComment = (comment: Comment, depth = 0) => {
    const replies = comments.filter(c => c.parentId === comment._id);
    const isReplying = replyTo === comment._id;
    const isEditing = editingId === comment._id;
    const isOwner = user?._id === comment.userId._id;

    return (
      <div key={comment._id} className={`mt-6 ${depth > 0 ? 'ml-8 border-l-2 border-gray-100 pl-4' : ''}`}>
        <div className="flex gap-4">
          <Avatar className="w-10 h-10 border-2 border-white shadow-sm flex-shrink-0">
            {comment.userId.avatar && <AvatarImage src={comment.userId.avatar} />}
            <AvatarFallback className="bg-[#2C5F2D] text-white font-bold w-full h-full flex items-center justify-center">
              {comment.userId.name.trim().charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-sm">{comment.userId.name}</span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                  {timeAgo(new Date(comment.createdAt))} ago
                </span>
              </div>
              
              {isOwner && !isEditing && (
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => { setEditingId(comment._id); setEditContent(comment.content); }}
                    className="p-1 text-gray-400 hover:text-[#2C5F2D] transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setDeleteTargetId(comment._id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="mt-2 space-y-3">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[100px] rounded-xl border-gray-200 focus:border-[#2C5F2D] focus:ring-[#2C5F2D]/10 resize-none text-sm"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => { setEditingId(null); setEditContent(''); }}
                    className="text-gray-500 font-bold h-8 px-3"
                  >
                    <X className="w-3.5 h-3.5 mr-1.5" /> Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleUpdateComment(comment._id)}
                    disabled={loading || !editContent.trim()}
                    className="bg-[#2C5F2D] hover:bg-[#234F24] text-white font-bold h-8 px-4"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{comment.content}</p>
                
                {user && (
                  <button 
                    onClick={() => setReplyTo(isReplying ? null : comment._id)}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-[#2C5F2D] hover:text-[#1e421e] uppercase tracking-widest transition-colors"
                  >
                    <Reply className="w-3 h-3" />
                    Reply
                  </button>
                )}
              </>
            )}

            {isReplying && (
              <div className="mt-4 space-y-3">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="min-h-[80px] rounded-xl border-gray-200 focus:border-[#2C5F2D] focus:ring-[#2C5F2D]/10 resize-none text-sm"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setReplyTo(null)}
                    className="text-gray-500 font-bold h-8 px-3"
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleSubmitReply(comment._id)}
                    disabled={loading || !replyContent.trim()}
                    className="bg-[#2C5F2D] hover:bg-[#234F24] text-white font-bold h-8 px-4"
                  >
                    Post Reply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {replies.map(reply => renderComment(reply, depth + 1))}
      </div>
    );
  };

  const rootComments = comments.filter(c => !c.parentId);

  return (
    <div className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div 
        className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2C5F2D]/5 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-[#2C5F2D]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 leading-none mb-1">
              {comments.length} Comments
            </h3>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Join the discussion</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-[#2C5F2D] font-bold text-sm uppercase tracking-widest">
          {isExpanded ? 'Collapse' : 'Expand Comments'}
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      <Separator className="bg-gray-100" />

      {isExpanded && (
        <div className="p-8">
          {user ? (
            <div className="mb-10">
              <div className="flex gap-4 mb-4">
                <Avatar className="w-10 h-10 border-2 border-white shadow-sm flex-shrink-0">
                  {user.avatar && <AvatarImage src={user.avatar} />}
                  <AvatarFallback className="bg-[#2C5F2D] text-white font-bold w-full h-full flex items-center justify-center">
                    {user.name.trim().charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts about this module..."
                    className="min-h-[120px] rounded-2xl border-gray-200 focus:border-[#2C5F2D] focus:ring-[#2C5F2D]/10 resize-none p-4 text-sm"
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSubmitComment}
                      disabled={loading || !newComment.trim()}
                      className="bg-[#2C5F2D] hover:bg-[#234F24] text-white font-bold px-8 py-6 rounded-2xl shadow-lg shadow-[#2C5F2D]/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Send className="w-4 h-4 mr-2" /> Post Comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-6 text-center mb-10 border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium mb-4">Please log in to participate in the discussion.</p>
              <Button 
                variant="outline" 
                className="border-[#2C5F2D] text-[#2C5F2D] font-bold px-6"
                onClick={() => window.location.href = '/login'}
              >
                Log In
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {rootComments.length > 0 ? (
              rootComments.map(comment => renderComment(comment))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-400 font-medium">No comments yet. Be the first to start the conversation!</p>
              </div>
            )}
          </div>
        </div>
      )}

      <AlertDialog open={!!deleteTargetId} onOpenChange={(open) => !open && setDeleteTargetId(null)}>
        <AlertDialogContent className="admin-dialog" style={{ maxWidth: '440px' }}>
          <div className="dialog-accent-bar" style={{ background: '#ef4444' }} />
          <div className="dialog-header" style={{ paddingBottom: '8px' }}>
            <AlertDialogTitle><h2>Delete Comment?</h2></AlertDialogTitle>
            <AlertDialogDescription>
              <p>This action cannot be undone. This will permanently remove your comment and any replies attached to it from the database.</p>
            </AlertDialogDescription>
          </div>
          <div className="dialog-footer">
            <button 
              className="btn-cancel" 
              onClick={() => setDeleteTargetId(null)}
            >
              Cancel
            </button>
            <button 
              className="btn-save btn-danger" 
              onClick={handleDeleteComment}
            >
              Delete Permanently
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
