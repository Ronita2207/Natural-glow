import cv2
import numpy as np
import matplotlib.pyplot as plt
from urllib.request import urlopen
import io

# Function to download and read an image from URL
def load_image_from_url(url):
    resp = urlopen(url)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB

# Load a sample image
sample_image_url = "https://images.unsplash.com/photo-1500622944204-b135684e99fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
image = load_image_from_url(sample_image_url)

# Create a class for Instagram-like filters
class InstagramFilters:
    @staticmethod
    def grayscale(image):
        return cv2.cvtColor(cv2.cvtColor(image, cv2.COLOR_RGB2GRAY), cv2.COLOR_GRAY2RGB)
    
    @staticmethod
    def sepia(image):
        img_sepia = np.array(image, dtype=np.float64)
        img_sepia = cv2.transform(img_sepia, np.matrix([
            [0.393, 0.769, 0.189],
            [0.349, 0.686, 0.168],
            [0.272, 0.534, 0.131]
        ]))
        img_sepia[np.where(img_sepia > 255)] = 255
        return np.array(img_sepia, dtype=np.uint8)
    
    @staticmethod
    def warm(image):
        img_warm = np.array(image, dtype=np.float64)
        img_warm[:,:,0] = img_warm[:,:,0] * 1.1  # Increase red
        img_warm[:,:,2] = img_warm[:,:,2] * 0.9  # Decrease blue
        img_warm = np.clip(img_warm, 0, 255)
        return np.array(img_warm, dtype=np.uint8)
    
    @staticmethod
    def cool(image):
        img_cool = np.array(image, dtype=np.float64)
        img_cool[:,:,0] = img_cool[:,:,0] * 0.9  # Decrease red
        img_cool[:,:,2] = img_cool[:,:,2] * 1.1  # Increase blue
        img_cool = np.clip(img_cool, 0, 255)
        return np.array(img_cool, dtype=np.uint8)
    
    @staticmethod
    def vignette(image, level=2):
        height, width = image.shape[:2]
        
        # Create a vignette mask
        X_resultant_kernel = cv2.getGaussianKernel(width, width/level)
        Y_resultant_kernel = cv2.getGaussianKernel(height, height/level)
        
        # Generate kernel matrix
        kernel = Y_resultant_kernel * X_resultant_kernel.T
        
        # Normalize the kernel
        mask = kernel / kernel.max()
        
        # Apply the mask to each channel
        vignette = np.copy(image)
        for i in range(3):
            vignette[:,:,i] = vignette[:,:,i] * mask
            
        return vignette.astype(np.uint8)
    
    @staticmethod
    def brightness_contrast(image, brightness=0, contrast=0):
        img_adj = np.int16(image)
        img_adj = img_adj * (1 + contrast/100) + brightness
        img_adj = np.clip(img_adj, 0, 255)
        return np.uint8(img_adj)
    
    @staticmethod
    def sharpen(image):
        kernel = np.array([[-1,-1,-1], 
                           [-1, 9,-1],
                           [-1,-1,-1]])
        return cv2.filter2D(image, -1, kernel)
    
    @staticmethod
    def vintage(image):
        # First apply sepia
        img_vintage = InstagramFilters.sepia(image)
        
        # Add slight vignette
        img_vintage = InstagramFilters.vignette(img_vintage, level=3)
        
        # Reduce brightness slightly
        img_vintage = InstagramFilters.brightness_contrast(img_vintage, brightness=-10, contrast=10)
        
        return img_vintage
    
    @staticmethod
    def clarendon(image):
        # Increase contrast and saturation
        img_clarendon = InstagramFilters.brightness_contrast(image, brightness=0, contrast=20)
        
        # Enhance blues slightly
        img_clarendon = np.array(img_clarendon, dtype=np.float64)
        img_clarendon[:,:,2] = np.clip(img_clarendon[:,:,2] * 1.1, 0, 255)
        
        return np.array(img_clarendon, dtype=np.uint8)

# Apply filters to the image
filters = {
    'Original': image,
    'Grayscale': InstagramFilters.grayscale(image),
    'Sepia': InstagramFilters.sepia(image),
    'Warm': InstagramFilters.warm(image),
    'Cool': InstagramFilters.cool(image),
    'Vignette': InstagramFilters.vignette(image),
    'Sharpen': InstagramFilters.sharpen(image),
    'Vintage': InstagramFilters.vintage(image),
    'Clarendon': InstagramFilters.clarendon(image),
    'High Contrast': InstagramFilters.brightness_contrast(image, brightness=0, contrast=30)
}

# Display the original and filtered images
plt.figure(figsize=(20, 15))
for i, (filter_name, filtered_img) in enumerate(filters.items()):
    plt.subplot(3, 4, i+1)
    plt.imshow(filtered_img)
    plt.title(filter_name)
    plt.axis('off')

plt.tight_layout()
plt.show()

# Example of how to save a filtered image
# cv2.imwrite('filtered_image.jpg', cv2.cvtColor(filters['Vintage'], cv2.COLOR_RGB2BGR))

print("Instagram-like filters applied successfully!")

