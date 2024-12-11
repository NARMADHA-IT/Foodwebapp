from django.shortcuts import render, redirect
from django.http import JsonResponse
from .forms import SignUpForm
from .models import User
import json
from django.views.decorators.csrf import csrf_exempt
from .models import DeliveryAddress



def index(request):
    return render(request, 'main/index.html')

def dessert(request):
    return render(request, 'main/dessert.html')

def pizza(request):
    return render(request, 'main/pizza.html')

def burger(request):
    return render(request, 'main/burger.html')

def soup(request):
    return render(request, 'main/soup.html')

def drinks(request):
    return render(request, 'main/drinks.html')

def signin(request):
    return render(request, 'main/signin.html')

def signUp(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()  # Save the user data to the database
            return JsonResponse({'success': 'Registration successful! You can now sign in.'})
        else:
            print(form.errors)  # Debug: Print form errors to the console
            return JsonResponse({'error': form.errors.as_json()}, status=400)
    else:
        form = SignUpForm()  # If GET request, show the empty form
    return render(request, 'main/signUp.html', {'form': form})  # Render the form to the template

def help(request):
    return render(request, 'main/help.html')

def cart(request):
    return render(request, 'main/cart.html')



@csrf_exempt  # Disable CSRF for this endpoint (if CSRF token isn't working)
def save_address(request):
    if request.method == "POST":
        try:
            import json
            data = json.loads(request.body)  # Parse JSON data

            # Extract fields
            address_line_1 = data.get('addressLine1')
            address_line_2 = data.get('addressLine2', '')
            city = data.get('city')
            state = data.get('state')
            zipcode = data.get('zipcode')
            additional_info = data.get('additionalInfo', '')

            # Validate required fields
            if not (address_line_1 and city and state and zipcode):
                return JsonResponse({'success': False, 'error': 'Required fields are missing!'})

            # Save to database
            DeliveryAddress.objects.create(
                address_line_1=address_line_1,
                address_line_2=address_line_2,
                city=city,
                state=state,
                zipcode=zipcode,
                additional_info=additional_info,
            )

            return JsonResponse({'success': 'Address saved successfully!'})

        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})

    return JsonResponse({'success': False, 'error': 'Invalid request method!'})




def payment_page(request):
    # Pass any required context (like cart total, etc.) to the template
    return render(request, 'main/payment.html')

def payment_page(request):
    # Example: Calculate total amount
    cart_total = request.session.get('cart_total', 0)  # Replace with your actual logic
    gst = cart_total * 0.18
    delivery_charge = 50 if request.session.get('payment_method') == 'cod' else 0
    total_price = cart_total + gst + delivery_charge

    return render(request, 'main/payment.html', {
        'cart_total': cart_total,
        'gst': gst,
        'delivery_charge': delivery_charge,
        'total_price': total_price,
    })
