from django import forms
from .models import User
from django.contrib.auth.hashers import make_password

class SignUpForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['email_or_phone', 'password']
    
    def clean_email_or_phone(self):
        email_or_phone = self.cleaned_data.get('email_or_phone')
        if User.objects.filter(email_or_phone=email_or_phone).exists():
            raise forms.ValidationError("This email or phone is already in use.")
        return email_or_phone

    def save(self, commit=True):
        user = super(SignUpForm, self).save(commit=False)
        user.password = make_password(self.cleaned_data['password'])  # Encrypt password
        if commit:
            user.save()
        return user
