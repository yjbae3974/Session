from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.http import JsonResponse #새로 임포트한 부분
import json
from django.views.decorators.csrf import csrf_exempt

from .models import Comment, Post, Like


def signup(request):
   if request.method == 'POST':
      username = request.POST['username']
      password = request.POST['password']
      exist_user = User.objects.filter(username=username)
      if exist_user:
           error = "이미 존재하는 유저입니다."
           return render(request, 'registration/signup.html', {"error":error})
      
      new_user = User.objects.create_user(username=username, password=password)
      auth.login(request, new_user)
   
      return redirect('home')
       
   return render(request, 'registration/signup.html')

def login(request):
   if request.method == 'POST':
      username = request.POST['username']
      password = request.POST['password']
      user = auth.authenticate(username=username, password=password)
      if user is not None:
           auth.login(request, user)
           return redirect(request.GET.get('next', '/'))
      error = "아이디 또는 비밀번호가 틀립니다"
      return render(request, 'registration/login.html', {"error":error})
        
   return render(request, 'registration/login.html')

def home(request):
   posts = Post.objects.all()

   return render(request, 'home.html', {'posts':posts})


def logout(request):
   auth.logout(request)
   return redirect('home')

@login_required(login_url="/registration/login/")
def new(request):
   if request.method == "POST":
       title = request.POST['title']
       content = request.POST['content']

       new_post = Post.objects.create(
           title=title,
           content=content,
           author=request.user
           )
       return redirect('detail', new_post.pk)
  
   return render(request, 'new.html')

@login_required(login_url="/registration/login/")
def detail(request, post_pk):
   post = Post.objects.get(pk=post_pk)
   
   if request.method == 'POST':
        content = request.POST['content']
        Comment.objects.create(
            post=post,
            content=content,
            author=request.user
        )
        return redirect('detail', post_pk)

   return render(request, 'detail.html', {'post':post})


def edit(request, post_pk):
   post = Post.objects.get(pk=post_pk)


   if request.method == 'POST':
       title = request.POST['title']
       content = request.POST['content']
       Post.objects.filter(pk=post_pk).update(
           title=title,
           content=content
       )
       return redirect('detail', post_pk)


   return render(request, 'edit.html', {'post':post})


def delete(request, post_pk):
   post = Post.objects.get(pk=post_pk)
   post.delete()
   return redirect('home')


def delete_comment(request, post_pk, comment_pk):
    if request.user.is_authenticated:
        comment = Comment.objects.get(pk=comment_pk)
        if comment.author == request.user:  # Ensure the logged in user is the author
            comment.delete()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Unauthorized'}, status=403)
    return JsonResponse({'error': 'Not logged in'}, status=401)

@csrf_exempt
def like(request):
   if request.method == "POST":
      request_body = json.loads(request.body)
      post_pk = request_body['post_pk']
      post = Post.objects.get(pk = post_pk)
      user_like = Like.objects.filter(user=request.user, post = post)

      if len(user_like) > 0:
         user_like.delete()
      else:
         Like.objects.create(
            post = post,
            user = request.user
         )

      response = {
         'like_count' : post.likes.count(),
      }

      return HttpResponse(json.dumps(response))
   
   
@login_required(login_url="/registration/login/")
def add_comment(request, post_pk):
    if request.method == 'POST':
        post = Post.objects.get(pk=post_pk)
        content = request.POST.get('content')
        if content:
            comment = Comment.objects.create(post=post, content=content, author=request.user)
            return JsonResponse({
                'content': comment.content,
                'author': comment.author.username,
                'comment_id': comment.pk,
            })
        else:
            return JsonResponse({'error': 'Content is empty'}, status=400)