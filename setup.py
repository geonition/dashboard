from setuptools import setup
from setuptools import find_packages

setup(
    name='dashboard',
    version='5.1.0',
    author='Kristoffer Snabb',
    url='https://github.com/geonition/dashboard',
    packages=find_packages(),
    include_package_data=True,
    package_data = {
    "dashboard": [
        "templates/*",
        "static/styles/*",
        "static/img/*",
        "static/json/*",
        "locale/*/LC_MESSAGES/*"
        ]
        },
    zip_safe=False,
    install_requires=[
       'django',
       'django-modeltranslation'
    ]
)
